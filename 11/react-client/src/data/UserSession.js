export class UserSession {
  constructor(
    username,
    password,
    profile_image,
    nickname,
    birthdate,
    level,
    credit,
    delete_date,
    price,
    title_image
  ) {
    this.username = username;
    this.password = password;
    this.profile_image = profile_image;
    this.nickname = nickname;
    this.birthdate = birthdate;
    this.level = level;
    this.credit = credit;
    this.delete_date = delete_date;
    this.price = price;
    this.title_image = title_image;
  }
}
