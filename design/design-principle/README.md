# 基本的な設計原則

## 課題 1（SOLID）

### SOLID 原則の各要素を、業務経験 1 年目の IT エンジニアに伝わるように説明してください。これらを守ることで、どのようなメリットがあるのでしょうか？

SOLID の原則を遵守すると、

1. ソフトウェアの拡張性の向上 -> 変更しやすい、再利用しやすい
2. 保守性の向上 -> 変更に強い
3. 可読性の向上 -> 理解しやすい

各 SOLID の原則

#### Single Responsibility Principle (単一責任の原則)

すべてのモジュールにおいて、それが持つ責務は 1 つとする。責務を 1 つに限定することで、変更箇所を明確・限定することができる。
これ以上分割できないぐらいに小さく機能を作り、尚且つ概念が異なるものは分けるようにする。

下の例では、Order に sendInvoice と sendReceipt が入っているが、
別のクラスに分けることで責任を単一化できる。

```
class Order {
    ...
    public sendInvoice()
    public sendReceipt()
}
```

```
class Invoice {
    ...
    public sendInvoice(){
        console.log('sending invoice');
    }
}

class Receipt {
    ...
    public sendReceipt(){
        console.log('sending receipt');
    }
}
```

#### Open/Closed Principle (オープンクローズドの原則)

モジュールは既存コードを変更せず新しい機能を追加できるようにするべき。
拡張が容易になり、既存コードへの変更の影響を与えることがなくなる。拡張機能のみテストすれば良い。
オープンクローズドの原則を守るには、場合(ケース)によって振る舞いが異なるなら、それぞれの振る舞いをクラスに分ける。そしてそれらのクラスが共通のインターフェースを持つ、あるいは共通の抽象クラスを継承するようにする。

応用としてどのオブジェクトを生成するかを分岐するのにファクトリーパターンを利用することも検討する。

productType を追加すると、getProductTypePrice に変更を加える必要がある。

```
class Product {
    private productType: string;

    constructor(productType: string){
        this.productType = productType;
    }
}

getProductTypePrice(product){
    switch(product){
        product.productType === 'food':
            return 100
        product.productType === 'digital':
            return 200;
        ...
    }
}
```

新しい productType を追加しても新しいサブクラスを追加すれば良い。拡張に対してオープンになる。

```
abstract class ProductType {
    abstract getProductTypePrice(): number;
}

class Food extends ProductType {
    getProductTypePrice(){
        return 100;
    }
}

class Digital extends ProductType {
    getProductTypePrice(){
        return 200;
    }
}
```

#### Liskov substitution principle (リスコフの置換原則)

サブタイプはスーパータイプと置換可能でなければならない。
つまり、サブタイプのインスタンスはスーパータイプのインスタンスと同じように振る舞うべきであり、継承時にスータータイプの代わりにサブタイプを利用しても、不都合のないようにしなければならない。一般的にこの原則は is-a の関係だけでなく、挙動まで同じであることを求めている。

ペンギンは鳥だが飛ぶことができないので、原則に違反している。

```
interface Bird {
  fly(): void;
}

class Sparrow implements Bird {
  fly() {
    console.log("Sparrow is flying!");
  }
}

class Penguin implements Bird {
  fly() {
    throw new Error("Penguins can't fly!");
  }
}

function makeBirdFly(bird: Bird) {
  bird.fly();
}

const sparrow = new Sparrow();
makeBirdFly(sparrow);

const penguin = new Penguin();
makeBirdFly(penguin);
```

ペンギンは食べることはできるので、Bird クラスを置換することができ原則を遵守している。

```
interface Bird {
  eat(): void;
}

interface FlyingBird extends Bird {
  fly(): void;
}

class Sparrow implements FlyingBird {
  eat() {
    console.log("Sparrow is eating!");
  }

  fly() {
    console.log("Sparrow is flying!");
  }
}

class Penguin implements Bird {
  eat() {
    console.log("Penguin is eating!");
  }
}

function makeFlyingBirdFly(bird: FlyingBird) {
  bird.fly();
}


const sparrow = new Sparrow();
makeFlyingBirdFly(sparrow);

const penguin = new Penguin();
```

#### Interface segregation principle (インターフェース分離の原則)

インターフェースのクライアントに、クライアントが利用しない property/method への依存を強制してはならない。もし、クライアントの一部のメソッドが未実装になる場合は、インターフェースの分離を検討すべきである。つまりインターフェースはなるべく小さい方が良いとも言える。

プリンターはスキャンとファックス機能がない。

```
interface Machine {
  print(document: string): void;
  scan(document: string): void;
  fax(document: string): void;
}

class SimplePrinter implements Machine {
  print(document: string): void {
    console.log(`Printing: ${document}`);
  }

  scan(document: string): void {
    throw new Error("Scan not supported!");
  }

  fax(document: string): void {
    throw new Error("Fax not supported!");
  }
}

```

適切にインターフェースを分離する

```
interface Printer {
  print(document: string): void;
}

interface Scanner {
  scan(document: string): void;
}

interface Fax {
  fax(document: string): void;
}

class SimplePrinter implements Printer {
  print(document: string): void {
    console.log(`Printing: ${document}`);
  }
}

class MultiFunctionPrinter implements Printer, Scanner, Fax {
  print(document: string): void {
    console.log(`Printing: ${document}`);
  }

  scan(document: string): void {
    console.log(`Scanning: ${document}`);
  }

  fax(document: string): void {
    console.log(`Faxing: ${document}`);
  }
}
```

#### Dependency inversion principle (依存関係逆転の原則)

依存性逆転の原則では、他モジュールの直接利用を避けて、間に抽象を挟み、A と B の両者が抽象に依存するよう実装すべき。
つまりモジュールの依存先は抽象に限定すべきであり、具象に依存するべきではない。

Button クラスは SendEmail クラスに密結合している。

```
class SendEmail {
  public execute(): void {
    console.log('send email');
  }
}

class Button {
  private sendEmail: SendEmail

  constructor(){
    this.sendEmail = new SendEmail();
  }

  public onClick(){
    this.sendEmail.execute()
  }
}
```

インターフェースに両クラスを依存させることで、依存関係を逆転させることができている

```
abstract class SendDocument {
  abstract execute(): void
}

class SendEmail extends SendDocument {
  public execute(): void{
    console.log('send email');
  }
}

class Button {
  private sendDocument: SendDocument;

  constructor(sendDocument: SendDocument){
    this sendDocument = sendDocument;
  }

  public onClick(){
    this.sendDocument.execute();
  }
}
```

### 単一責任の原則と、単純にファイルを細かなファイルに分解することには、どのような違いがあるでしょうか？

単一責任の原則はクラス、モジュール、または関数が一つの責任を持つように設計する行為で、
その目的は凝集度を高め保守性を高める行為なのに対して、ファイル分割は物理的にコードを分割し見た目を整理すること。

### Open-Closed-Principle の実例を一つ考えて、作成してみてください。

SOLID の Open-Closed-Principle の例を確認してください。

### リスコフの置換原則に違反した場合、どのような不都合が生じるでしょうか？

1. スーパークラスで定義されて振る舞いがサブクラスで守られなくなり開発者は振る舞いが予測できなくなる
2. 多態性(ポリモーフィズム)が成立しなくなりコードの再利用性が低下する
3. スーパークラスの仕様が守られていないので、テストの範囲が広がる可能性

### どんな時に依存性の逆転を用いる必要が生じるのでしょうか？

1. 高レベルモジュールが低レベルモジュールに依存しているとき(ビジネスロジックが DB や外部 API などに依存する)
2. 複数の実装を切り替えたい時
3. 抽象を導入して依存関係を注入することでモックやスタブを使いテストができるようになる
4. ソフトウェアの拡張性と再利用性を高めたい時に抽象に依存させる

### デメトルの法則とは何でしょうか？業務経験 1 年目の IT エンジニアに伝わるように説明してください。この法則を守ることで、どのようなメリットがあるのでしょうか？

デメトルの法則とは「仲良しの友達だけに頼る」というルールです。
プログラムを書くときに、「このオブジェクトは直接知る必要があるのかな？」と考える癖をつけると良いです。

例えば友達にシャーペンを貸してもらうのに、あなた自身が友達の机の中に手を突っ込む必要はありませんよね。
そこは友達に聞くだけでいいので詳細は知る必要がありません。

```
class Purchase {
  private _userId: string
  private _productId: string
  constructor(userId: string, productId: string) {
      this._userId = userId
      this._productId = productId
  }

  // 新人「こうやってgetter/setterを定義してあげればデメトルの法則には違反しませんよね！」
  public get userId() {
      return this._userId
  }
  public set userId(id) {
      this._userId = id
  }
  public get productId() {
      return this._productId
  }
  public set productId(id) {
      this._productId = id
  }
}
```

#### これだけでは特にコードの保守性に対して効果が無いことを説明してあげてください

デメテルの法則は直接オブジェクトプロパティにアクセスするなと言っているのではありません。
getter/setter メソッドを追加しただけでは、実際には直接サクセスしているのと変わりありません。
デメテルの法則は、「オブジェクトが関係を持つオブジェクトにのみ依存するべきであり、それ以外のオブジェクトの詳細には関与しない」ことを求めます。

Purchase クラスの userId と productId を取得して何かをする場合、
本来 Purchase クラスの責任が外部に移動している可能性がある。

例えば Purchase クラスは購入に関する処理を実行するのが目的なので、
その処理ロジックを Purchase クラスに含める。以下の例では process という処理ロジックを作りました。

```
class Purchase {
  private _userId: string;
  private _productId: string;

  constructor(userId: string, productId: string) {
    this._userId = userId;
    this._productId = productId;
  }

  public process(): void {
    console.log(`${this._userId} purchased ${this._productId}`);
  }
}

```

#### デメテルの法則を守ることにはどのような意味/効果があるのでしょうか？

1. オブジェクト同士の結合度を下げ適切なカプセル化を実現することができる。
2. オブジェクトの内部状態や実装を外部から保護する
3. クラスごとにテスト可能な単位が明確になるのでテストが簡潔になる

参考: [SOLID 原則完全に理解した！になるための本](https://zenn.dev/nakurei/books/solid-principle-kanzen-rikai)

## 課題 2（SQL に漏れたドメインルール）

サンプルコード:

```
interface Purchase {
  userId: string
  productId: string
  transaction: {
    succeeded: true
    completedAt: Date
  }
}

interface PaymentRecordRepo {
  getPurchasesBy: (userId: string) => Purchase[]
}

class PurchaseService {
  public constructor(private paymentRecordRepo: PaymentRecordRepo) {}

  public purchase(userId: string, productId: string) {
    const allPurchases = this.paymentRecordRepo.getPurchasesBy(userId)
    const pastPurchase = allPurchases.find((p) => p.productId === productId && p.transaction.succeeded)
    if (pastPurchase) {
      throw new Error('この商品はおひとりさま一品限定です！')
    }

    // 購入手続きに進む
  }
}
```

アプリケーション側で処理する場合:

条件: ビジネスロジックが存在する箇所を一箇所に集中させる。複雑なロジックや今後頻繁に変更される可能性がある。

- ロジックが一箇所に記述されるので保守性が向上
- データ量が多くなると処理に時間がかかる。実際のデータ量を計測することが必要

SQL にビジネスロジックを実装させ処理する場合:

条件: 取得するデータ量が多くサーバー側の処理負担が大きい。またシンプルな SQL 文で済む場合。

- データベース側に処理をある程度委託できるので処理負荷が限定される
- ビジネスロジックがアプリケーション以外(インフラ寄り)に分散する
- 複雑なビジネスロジックだと SQL クエリが肥大化する

あるいは、SQL クエリはシンプルさを維持して複雑なビジネスロジックはアプリケーションレイヤーに処理を任せる。
具体的には SQL で特定ユーザーの 1 年以内の購入履歴を取得し、それ以上の処理はアプリケーションレイヤーに任せる。

## 課題 3（カプセル化）

```
class Person {
    public name: string
    public starWorkingAt: Date
    constructor(name: string, startWorkingAt: Date) {
        this.name = name
        this.starWorkingAt = startWorkingAt
    }
}

class Company {
    public people: Person[]
    constructor(people: Person[]) {
        this.people = people
    }
}

const company = new Company([new Person('a', new Date('2021-01-01')), new Person('b', new Date('2021-01-1'))])
const firstPerson = company.people[0]

// 何らかのロジックに使用するため、Person Aの勤務開始日を取り出す
const date = firstPerson.starWorkingAt

// さまざまなロジックで使用しているなかで誤って更新してしまう
date.setFullYear(1000)
firstPerson.name = 'modified name'

console.log(company) // companyの中に含まれていたPerson Aの勤務開始日が変わってしまう！
```

#### この設計にはどのような問題が潜んでいるでしょうか？

1. カプセル化不足
   1. Getter/Setter を追加するだけでは、外部から自由に値を操作可能な状態が続く
2. 防御的コピーの重要性
   1. Getter で直接 Date オブジェクトを返す場合、外部で変更されると内部データにも影響する

#### どうすれば解決できると思いますか？

1. 外部からプロパティをアクセスできないように private に変更する
2. Getter で値を変更する際は防御的コピーを使う([【Java】不変オブジェクトの作り方　参照の隠蔽と防衛的コピー](https://qiita.com/chooyan_eng/items/ba934145c30419c3cba6))
3. 値を変更する際はバリデーションを追加する

#### 同じ課題を渡された新人エンジニアが「わかりました！getter と setter を定義すれば良いんですね！」と言ってきました。なぜそれが問題を解決していないのか教えてあげましょう

Getter と Setter を追加しただけでは、プロパティでアクセスしているのと本質的には変化がなく、カプセル化の恩恵を受けれていない。カプセル化とは、関連するデータ（属性）とそれに対する操作（メソッド）を一つのオブジェクトとしてまとめ、外部からの直接的なアクセスを制限する仕組みを指します。

## （任意課題）

議論の際は「こうするべき」という結論に固執するのではなく、「凝集度と結合度を改善する」という共通目標をチームで持つこと。

凝集度:

1. 偶発的凝集（Coincidental Cohesion）- 全く関係のない機能が同じモジュールに集められている状態。
2. 論理的凝集（Logical Cohesion）- 複数の機能が論理的に関連しているが、内部で制御フラグや分岐によって切り替えられる。
3. 時間的凝集（Temporal Cohesion）- 特定の時間的なタイミング（初期化、終了処理など）で関連する機能が集められている。
4. 手続き的凝集（Procedural Cohesion）- 一連の処理手順をまとめているが、個々の処理が完全に関連していない。
5. 通信的凝集（Communicational Cohesion）- 同じデータを使って異なる処理をする機能がまとめられている。
6. 逐次的凝集（Sequential Cohesion）- 出力が次の処理の入力となる機能がまとめられている。
7. 機能的凝集（Functional Cohesion）- 単一の明確な目的を持つ機能がまとめられている。最高レベルの凝集度。

結合度:

1. 内部結合（Content Coupling）- 他のモジュールの内部に直接依存している。
2. 共通結合（Common Coupling）- 複数のモジュールが共通のデータを使用している。
3. 外部結合（External Coupling）- 外部リソース（ファイル、デバイス、API など）への依存。
4. 制御結合（Control Coupling）- 他のモジュールに制御情報（フラグや条件）を渡して処理を切り替える。
5. スタンプ結合（Stamp Coupling）- 必要な部分だけでなく、データ構造全体を渡す。
6. データ結合（Data Coupling）- 必要なデータだけを渡す。低い結合度で望ましい。
7. メッセージ結合（Message Coupling）- メッセージやイベントを通じてモジュールがやり取りする。最低レベルの結合度で理想的。
