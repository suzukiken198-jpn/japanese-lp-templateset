import { Heart, HouseLine, UsersThree, Clock, ClipboardText, ForkKnife, PersonSimpleWalk, PencilSimple, Coffee } from "@phosphor-icons/react";
export const navigation = [["home","ホーム"],["services","サービス"],["features","選ばれる理由"],["flow","1日の流れ"],["price","ご利用料金"],["staff","スタッフ紹介"],["faq","よくある質問"],["access","アクセス"]];
export const services = [
 {name:"健康体操",image:"body-care",icon:PersonSimpleWalk,summary:["体を動かす、楽しい","機能訓練プログラム"],detail:"専門スタッフと一緒に、無理なく体を動かします。お一人おひとりの体調やペースに合わせて取り組みます。"},
 {name:"創作活動",image:"care-story",icon:PencilSimple,summary:["手先を使って楽しむ","季節の作品づくり"],detail:"季節を感じる作品づくりや、手先を使った活動を用意しています。完成した作品はご自宅にお持ち帰りいただけます。"},
 {name:"レクリエーション",image:"family-support",icon:UsersThree,summary:["みんなで笑って楽しむ","毎日のレクタイム"],detail:"ゲームや会話を通して、自然に交流が生まれる時間です。参加方法はその日の気分に合わせて選べます。"},
 {name:"季節のイベント",image:"outing",icon:HouseLine,summary:["四季折々の楽しみを","みなさんと一緒に"],detail:"お花見や季節の行事など、日々の暮らしに小さな楽しみを添えるイベントを開催します。"},
];
export const reasons = [[Heart,"専門スタッフによる","安心のケア"],[UsersThree,"楽しく過ごせる","豊富なプログラム"],[Coffee,"栄養バランスの取れた","手作りの昼食"],[HouseLine,"送迎サービスで","通いやすい"],[ClipboardText,"清潔で快適な","施設環境"]];
export const voices = [{image:"voice-man",quote:"「ここに来るのが楽しみです。スタッフの皆さんが優しくて、毎日が明るくなりました。」",person:"80代 男性"},{image:"voice-woman",quote:"「体操もおしゃべりも楽しく、安心してお願いできます。」",person:"70代 女性"},{image:"voice-family",quote:"「家族の時間にもゆとりができました。」",person:"ご家族様"}];
export const flowSteps = [[Clock,"8:30","ご自宅へお迎え","送迎車でお伺いします"],[PersonSimpleWalk,"9:30","健康チェック","体調を確認します"],[UsersThree,"10:00","午前の活動","体操・創作など"],[ForkKnife,"12:00","昼食・休憩","栄養バランスのお食事"],[UsersThree,"13:30","午後の活動","レク・交流の時間"],[Coffee,"15:00","おやつ・談話","ほっとひと息"],[HouseLine,"16:30","ご自宅へお送り","今日もお疲れさまでした"]];
export const faqs = [["見学や体験利用はできますか？","はい、見学・無料体験を受け付けています。ご本人・ご家族だけでも、お気軽にご相談ください。"],["送迎の範囲はどこまでですか？","海老名市周辺を中心に送迎しています。対応エリアはご希望の住所を伺ってご案内します。"],["どのような人が利用できますか？","要支援・要介護の認定を受けた方が対象です。詳しい条件は担当のケアマネジャーへご確認ください。"],["食事の内容を教えてください。","施設内で調理した、季節感のある栄養バランスに配慮した食事をご用意しています。"]];
export const extraFaqs = [["家族だけでも相談できますか？","ご家族からのご相談も歓迎しています。"],["利用料金はいくらですか？","要介護度や利用時間、負担割合により異なります。目安を掲載していますので、詳細はご相談ください。"]];
