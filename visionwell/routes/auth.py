import smtplib
import threading
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

# ... (other imports and route definitions)


def send_password_reset_email(mail_sender, account, reset_url, smtp_host, smtp_port, smtp_user, smtp_password):
    """Send a password reset email with proper Unicode (UTF-8) support."""

    msg = MIMEMultipart("alternative")
    msg["Subject"] = "パスワードリセットのご案内"
    msg["From"] = mail_sender
    msg["To"] = account.username

    # Build plain-text and HTML parts with explicit utf-8 charset
    text_body = f"パスワードをリセットするには、以下のリンクをクリックしてください:\n{reset_url}"
    html_body = f"""
    <html>
      <body>
        <p>パスワードをリセットするには、以下のリンクをクリックしてください:</p>
        <p><a href="{reset_url}">{reset_url}</a></p>
      </body>
    </html>
    """

    part_text = MIMEText(text_body, "plain", "utf-8")
    part_html = MIMEText(html_body, "html", "utf-8")
    msg.attach(part_text)
    msg.attach(part_html)

    def send_async():
        try:
            with smtplib.SMTP(smtp_host, smtp_port) as server:
                server.ehlo()
                server.starttls()
                server.login(smtp_user, smtp_password)
                # FIX: use send_message() instead of sendmail(..., msg.as_string())
                # sendmail() encodes the message as ASCII, which fails for non-ASCII
                # (e.g. Japanese) content. send_message() handles UTF-8 correctly.
                server.send_message(msg)
        except Exception as e:
            print(f"Failed to send password reset email to {account.username}: {e}")
            raise

    threading.Thread(target=send_async).start()
