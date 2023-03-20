class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  //Handle search by using keyword
  search() {
    const keyword = this.queryStr.keyword
      ? {
          summary: {
            $regex: this.queryStr.keyword,
            $options: "i", //case-insensitive
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };

    // Removing fields from the query
    const removeFields = ["keyword", "limit", "page"];
    removeFields.forEach((el) => delete queryCopy[el]);

    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `${match}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  pagination(limitValue) {
    const page = Number(this.queryStr.page) || 1;
    const skip = (Number(page) - 1) * limitValue;

    this.query = this.query.limit(limitValue).skip(skip);
    return this;
  }
}

module.exports = APIFeatures;
