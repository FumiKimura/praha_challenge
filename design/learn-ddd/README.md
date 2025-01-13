# DDD を学ぶ（基礎）

## 課題１

### 以下の用語を解説してください

#### エンティティ

エンティティは属性ではなく一意の識別子を持ち識別されるオブジェクト。
例えば商品 ID を持つ商品などが該当します。

- 可変である
- 同じ属性であっても区別される
- 同一性により区別される

#### 値オブジェクト（バリューオブジェクト）

値オブジェクトは、一意の識別子を持たず Immutable なオブジェクトです。
値自体に意味があります。例えば住所、日付、金額などが該当し同じ値であれば同一とみなされます。

#### 集約(アグリゲート)

関連するオブジェクトの集合(アグリゲート)で、関連するエンティティや値オブジェクトを一つの単位としてまとめたものです。
集約にはルートエンティティ(root entity)が存在し、外部からのアクセスはルートエンティティを介して行われます。

#### ユビキタス言語

ユビキタス言語とは、エンジニアとビジネス側が共通して使用する言語のことです。共通言語があることで双方の認識のズレをなくしビジネスロジックを正確にコードに反映することができます。

#### 境界づけられたコンテキスト

境界づけられたコンテキストとは、ドメイン内の特定の部分を明確に区切った領域のことです。
各コンテキスト内ではユビキタス言語(共通言語)の意味が一貫しており、外部とのインターフェースや統合のポイントを明確にします。

#### ドメイン

ドメインとはソフトウェアが解決しようとする問題領域や業務領域を指します。ドメインの理解は適切なドメインモデルの構築に不可欠です。

#### ドメインサービス

ドメインサービスは、ドメインの振る舞いを明確にするビジネスロジックを提供するオブジェクトです。
複数のエンティティにまたがり操作を行います。

#### リポジトリ

リポジトリはエンティティの永続化と取得を抽象化するオブジェクトです。データベースなどのストレージからエンティティを保存・所得する際に使用され、ドメイン層とデータアクセス層の間の橋渡しを行います。

#### アプリケーション（ユースケース層と呼ばれることも）

アプリケーションサービスは、ユーザー要求やユースケースに応じてドメインモデルを利用し処理を行う層です。ユーザーインターフェースとドメインモデルの間を取り持ちます。この層はドメインロジック自体を持たず、あくまでドメインモデルの操作を調整する役割を果たします。

#### CQS/CQRS（似ているため、違いを重点的に調べてみましょう）

CQS(Command Query Separation) - オブジェクトのメソッドをコマンド(状態の変更)とクエリ(状態の取得)に分ける設計原則です。
CQRS(Command Query Responsibility Segregation) - システム全体をコマンド(書き込み)とクエリ(読み取り)で分離するアーキテクチャパターンです。
主な違い: CQS はオブジェクトの設計原則で、CQRS はシステムアーキテクチャのパターンです。

#### DTO(Data Transfer Object)

システム間や層間でデータを転送するためのオブジェクトです。例えばユーザー情報を外部に提供する際、ドメインオブジェクトを直接渡すのではなく、必要な情報のみが入っている DTO を作成し提供します。

#### ドメインモデル貧血症

ドメインモデルがデータのみを保持し、ビジネスロジックや振る舞いを持たない状態を指すアンチパターンです。
この状態ではビジネスロジックがサービス層や他の場所に分散し、低凝集になります。ドメインモデルにビジネスロジックや振る舞いを適切に組み込み高凝集にします。

## 課題 2

### 境界づけられたコンテキストの実例を一つ挙げてください

例えば顧客(Customer)という名前の概念があります。個人営業部門であれば一般人ですが、法人営業であれば会社になります。名前というプロパティは両部門に共通して存在しますが、、個人営業部門は個人名になり、法人営業部門は法人名になります。また、法人には国によっては ID が振られているし、苗字も名前もありません。同じ概念であっても、部門やコンテキストによって意味や扱いが異なることを明確に区別するのが、境界づけられたコンテキストです。

### 以下のプロパティを持つ「Human」エンティティを作成してください。

```
識別子(ID)
血液型
生年月日
名前
```

```ts
class Human {
  private id: number;
  private bloodType: 'A' | 'B' | 'O' | 'AB';
  private birthday: Date;
  private name: string;

  constructor(bloodType: string, birthday: string, name: string) {
    this.id = generateId(); // IDを生成
    this.bloodType = bloodType;
    this.birthday = new Date(birthday);
    this.name = name;
  }
}
```

### Human モデリングを担当した新人エンジニアからこんな事を聞かれました

```
「Humanクラスを設計しろと言われたのでこんなコードを書いたら、別の先輩に『プロパティはデータ型じゃなくて値オブジェクトにしておいて』って言われたんです。何がダメなんですか？」
```

```ts
class Human {
  constructor(
    public readonly id: string,
    public readonly bloodtype: string,
    public readonly birthdate: Date,
    public readonly name: string
  ) {
    if (!this.validProps({ id, bloodtype, birthdate, name })) {
      throw new Error('invalid prop');
    }
  }

  private validProps(props: {
    id: string;
    bloodtype: string;
    birthdate: Date;
    name: string;
  }): boolean {
    return (
      this.validId(props.id) &&
      this.validBloodtype(props.bloodtype) &&
      this.validBirthdate(props.birthdate) &&
      this.validName(props.name)
    );
  }
  private validId(value: string): boolean {
    /* 有効なIDである事のバリデーションを行う */ return true;
  }
  private validBloodtype(value: string): boolean {
    /* 有効な血液型である事のバリデーションを行う */ return true;
  }
  private validBirthdate(birthdate: Date): boolean {
    /* 有効な生年月日である事のバリデーションを行う */ return true;
  }
  private validName(name: string): boolean {
    /* 有効な名前である事のバリデーションを行う */ return true;
  }
}
```

#### さて、何がいけないのでしょう？

1. プリミティブデータ型になっており意味のない値を受け入れることができる
2. 各値のバリデーションロジックがあまり関係ない Human クラスに書かれているので、本来担わない責務を持っている

### 先ほど新人エンジニアが作成した「Human」エンティティの各プロパティを値オブジェクトに置き換えてください。

#### それぞれの値オブジェクトには以下のルールが存在します

```
ID：英数字のみ許容（!や$などの特殊記号は利用不可）
血液型：a,b,o,ab以外の値は設定できない
生年月日：20歳以上の生年月日しか設定できない
名前：20文字未満でなければいけない
```

```ts
enum BloodTypes {
    A = 'A'
    B = 'B'
    O = 'O'
    AB = 'AB'
}

class Id {
  private static readonly ID_FORMAT = /^[a-zA-Z0-9]+$/;
  private readonly id: string;

  private isValidId(id: string): boolean {
    return !Id.ID_FORMAT.test(id)
  }

  constructor(id: string) {
    if(!this.isValidId(id)) throw new Error(`Invalid ID value: ${id}`);
    this.id = id;
  }
}

class BloodType {
    private readonly bloodType: BloodTypes

    private isValidBloodType(bloodType): bloodType is BloodTypes {
        return Object.values(BloodType).includes(bloodType as BloodTypes);
    }

    constructor (bloodType: string){
        if(!this.isValidBloodType(bloodType)) throw new Error(`Invalid bloodType value: ${bloodType}`);
        this.bloodType = bloodType as BloodType;
    }
}

class Birthday {
    private static readonly MINIMUM_AGE = 20;
    private readonly birthday: Date

    private howManyYearsAgo(date: Date): boolean {
        // 今から何年前か判定するロジック
    }

    private isValidBirthday(birthdate: Date): boolean {
        return howManyYearsAgo(birthdate) >= MINIMUM_AGE;
    }

    constructor(){
        if(!isValidBirthday(birthday))throw new Error(`Invalid birthdate value: ${birthday.ISOFormat()}`);
        this.birthday = birthday;
    }
}

class Name {
    private static readonly MAXIMUM_NAME_LENGTH = 20;
    private name: string;

    private isValidName(name: string): boolean {
      return name.length < MAXIMUM_NAME_LENGTH;
    }

    constructor(name: string){
      if(!isValidName(name)) throw new Error(`Invalid name/length: ${name}/${name.length}`);
      this.name = name;
    }
}

class Human {
  private readonly id: Id
  private readonly name: Name;
  private readonly birthday: Birthday;
  private readonly bloodType: BloodType;

  constructor(id: Id, name: Name, birthday: Birthday, bloodType: BloodType){
    this.id = id;
    this.birthday = birthday;
    this.name = name;
    this.bloodType = bloodType;
  }
}
```
