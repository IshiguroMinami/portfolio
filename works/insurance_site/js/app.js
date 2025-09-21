document.addEventListener('DOMContentLoaded', () => {
  // フォームへのスムーススクロール
  const ctaButtons = document.querySelectorAll('.cta-button');
  const formSection = document.getElementById('contact-form');

  ctaButtons.forEach(button => {
      button.addEventListener('click', () => {
          formSection.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
          });
      });
  });

  // フォーム送信の処理（デモ用）
  const contactForm = document.getElementById('contact-form');
  contactForm.addEventListener('submit', (e) => {
      e.preventDefault(); // フォームのデフォルト送信をキャンセル

      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;

      // 簡単なバリデーション
      if (!name || !email || !message) {
          alert('必須項目をすべて入力してください。');
          return;
      }

      // ここにサーバーへの送信処理を記述します
      // 例: fetch('/submit-form', { method: 'POST', body: new FormData(e.target) })
      // .then(response => response.json())
      // .then(data => {
      //     alert('お問い合わせありがとうございます。内容を確認後、担当者よりご連絡いたします。');
      //     contactForm.reset(); // フォームをリセット
      // })
      // .catch(error => {
      //     alert('送信に失敗しました。時間をおいて再度お試しください。');
      // });

      // デモとしてアラートを表示
      alert('お問い合わせありがとうございます。内容を確認後、担当者よりご連絡いたします。');
      contactForm.reset();
  });
});