document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  const formMessage = document.getElementById('form-message');

  contactForm.addEventListener('submit', function(event) {
      event.preventDefault(); // フォームのデフォルト送信をキャンセル

      // フォーム送信の処理（ここではダミーのメッセージを表示）
      formMessage.textContent = 'お問い合わせありがとうございます。内容を確認後、担当者よりご連絡いたします。';
      formMessage.classList.remove('hidden');
      formMessage.classList.add('success-message');

      // フォームをリセット
      contactForm.reset();

      // 3秒後にメッセージを非表示にする
      setTimeout(() => {
          formMessage.classList.add('hidden');
          formMessage.classList.remove('success-message');
          formMessage.textContent = '';
      }, 3000);
  });
});