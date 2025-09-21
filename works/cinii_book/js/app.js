$(function () {
  //APIから返されたアイテムリストの削除
  function displayResults(items) {
    //表示されたメッセージの削除
    $(".message").remove();
    //アイテムと文字列の長さが０より多い場合は、
    if (items.length > 0) {
      //アイテム配列の各要素を反復して各本の情報を取ってきます。
      $.each(items, function (index, item) {
        //タイトルがある場合はタイトル名、なければ"タイトル不明"
        const title = item.title ? item.title : "タイトル不明";
        //作者名がある場合はその作者名、ない場合は"作者不明”
        const creator = item["dc:creator"] ? item["dc:creator"] : "作者不明";
        //出版社名がある場合はその出版社名、ない場合は"出版社不明"
        const publisher = item["dc:publisher"] ? item["dc:publisher"][0] : "出版社不明";
        //リンクがある場合はそのリンク、ない場合は"＃”
        const link = item.link["@id"] ? item.link["@id"] : "#";
        //各情報をHTMLリストアイテムとして作成
        const listItem = `
          <li class="lists-item">
            <div class="list-inner">
              <p>タイトル：${title}</p>
              <p>作者：${creator}</p>
              <p>出版社：${publisher}</p>
              <a href="${link}" target="_blank">書籍情報</a>
            </div>
          </li>`;
        //.lists要素の先頭に追加する
        $(".lists").prepend(listItem);
      });
    }
    //上記以外は
    else {
      //.lists要素の前に検索結果が見つかりませんでした。別のキーワードで検索してください。を表示する。
      $(".lists").before('<div class="message">検索結果が見つかりませんでした。<br>別のキーワードで検索してください。</div>');
    }
  }
  // エラー処理関数
  function ajaxError(err) {
    // リストをクリア
    $(".lists").empty();
    // 既存のメッセージを削除
    $(".message").remove();
    //予期せぬエラーが発生した場合に表示するメッセージを設定
    let message = "予期せぬエラーが起きました。<br>再読み込みを行ってください。";
    //ステータスコードが0の場合、インターネット接続の問題を示すメッセージを表示します。
    if (err.status === 0) {
      message = "正常に通信できませんでした。<br>インターネットの接続を確認してください。";
    }
    //ステータスコードが400の場合、検索キーワードが有効ではありません。1文字以上で検索してください。を表示
    else if (err.status === 400) {
      message = "検索キーワードが有効ではありません。<br>1文字以上で検索してください。";
    }
    //予期せぬエラーが起きました。再読み込みを行ってください。を表示
    $(".lists").before(`<div class="message">${message}</div>`);
  }
  //pageCountは現在のページ番号を保持するための変数
  let pageCount = 1;
  //lastSearchWordは最後に検索したワードを保持するための変数
  let lastSearchWord = "";

  //検索ボタンを押したとき
  $(".search-btn").on("click", function () {
    //#search-input IDの要素から入力された値を取得し、その値を searchWord に代入します。
    const searchWord = $("#search-input").val();
    //現在の検索ワードが前回の検索ワードと異なるかを確認します。
    if (searchWord !== lastSearchWord) {
      //検索ワードが変わった場合、ページ番号 pageCount を1にリセットします。
      pageCount = 1;
      //検索結果を表示するリスト要素 .lists の内容をクリアします。
      $(".lists").empty();
      //lastSearchWord を現在の検索ワードに更新します。
      lastSearchWord = searchWord;
    }
    //検索ワードが同じ場合、ページ番号 pageCount をインクリメントして次のページの結果を取得する準備をします。
    else {
      pageCount++;
    }
    // .ajax() メソッドを使用してAjaxリクエストを送信します。
    $.ajax({
      //検索ワードとページ番号を含むURLを指定します。searchWord と pageCount の値がテンプレートリテラルで埋め込まれます。
      url: `https://ci.nii.ac.jp/books/opensearch/search?title=${searchWord}&format=json&p=${pageCount}&count=20`,
      //HTTPメソッドとして GET を指定します。
      method: "GET"
    })
    // 成功時の処理関数を呼び出す
    .done(function(response){
      // 必要なデータを取得、存在しなければ空配列
      const items = response["@graph"][0]?.items || [];
      // 結果を表示
      displayResults(items);
    })
    // 失敗時の処理関数を呼び出す
    .fail(ajaxError);
  });
  //リセットボタンをクリックした時
  $(".reset-btn").on("click", function () {
    //変数pageCountの値を1にリセットします。これにより、次回の検索が最初のページから始まるようにします。
    pageCount = 1;
    //ラストサーチワードの値を空文字列にリセットします。次回の検索が新しい検索ワードとして扱われるようにします。
    lastSearchWord = "";
    //クラス名listsの要素の内容をクリアします。これにより、表示されている検索結果が削除されます。
    $(".lists").empty();
    //クラス名messageの要素を削除します。表示されているエラーメッセージや通知メッセージが削除されます。
    $(".message").remove();
    //IDがsearch-inputの要素の値を空文字列にリセットします。これにより、検索入力フィールドがクリアされます。
    $("#search-input").val("");
  });
});


/*done、fail内で関数を実行しています。
実行側でで引数を渡していないにも関わらずそれぞれの関数では引数を受け取れています。
なぜそのように実装したのか説明してください。

doneやfailで渡されるコールバック関数が、jQueryの内部で実行される際に自動的に引数を渡す仕組みがあるからです。
Ajaxリクエストの結果が戻ってきた際に、登録したコールバック関数が実行されます。
この際、jQueryは成功時または失敗時のデータを自動的にコールバック関数に渡します。*/


//参考にしたサイト
//https://qiita.com/katsunory/items/9bf9ee49ee5c08bf2b3d
//https://qiita.com/otsukayuhi/items/31ee9a761ce3b978c87a
//https://api.jquery.com/jQuery.ajax/#jqXHR


/*併せて以下の質問にご回答お願いします。
Apiとは?
あるソフトウェアの機能を別のソフトウェアから呼び出す仕組みを表します。
「アプリケーション・プログラミング・インターフェース(Application Programing Interface)」の頭文字をとったもので、「インターフェース」という言葉が意味するように「境界線」「接点」を用いてアプリケーションをつなぐ機能を提供します。
使用すれば、異なるソフトウェアやプログラムを連携させられるようになります。

Apiのメリット、デメリット
メリット
1:アプリケーション開発を効率化できる.既存のAPIを利用することで、新機能を迅速に実装可能になります。
2:他社システムと連携したサービスを提供できる。他のアプリやサービスと簡単にデータや機能を共有できます。
3:セキュリティ。APIを通じてアクセスを制限できるため、直接データベースや内部システムを公開するよりも安全性が高いです。

デメリット
1:連携先のサービスに依存する部分が多い。他社APIに依存することで、仕様変更や停止がシステムに影響を与える。
2:セキュリティ対策が必要になる。 認証情報の漏洩や不正アクセスが発生する可能性。
3:コスト。一部のAPIは無料で使用できるが、多くの場合、使用量に応じて課金される。（例: Google Cloud API）

Git管理する上で気を付けるポイントは？
一部のAPIは有料なものや利用料に応じて請求金額が変わるものがあるため、むやみやたらとGitHubに上げるのは気を付ける必要がある。
・APIキーをコードに平文で書かない。
・APIキーをクライアントコードに含めたり、コードリポジトリにコミットしたりしない。
・APIキーに機密情報を含めない。
*/
