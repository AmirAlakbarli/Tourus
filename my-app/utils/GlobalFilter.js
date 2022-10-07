class GlobalFilter {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  filter() {
    const tempQuery = { ...this.queryStr };
    const insufficient = ["page", "sort", "limit", "fileds"];
    insufficient.forEach((q) => delete tempQuery[q]);
    const tempQueryStr = JSON.stringify(tempQuery);
    const resQueryStr = tempQueryStr.replace(
      /\b(lt|gt|gte|lte)\b/g,
      (str) => `$${str}`
    );
    const resQuery = JSON.parse(resQueryStr);
    this.query.find(resQuery);
    return this;
  }

  sort() {
    if (this.queryStr.sort) {
      const sortFields = this.queryStr.sort.split(",").join(" ");
      this.query.sort(sortFields);
    } else {
      this.query.sort("-createdAt");
    }
    return this;
  }

  fields() {
    if (this.queryStr.fields) {
      const fields = this.queryStr.fields.split(",").join(" ");
      this.query.select(fields);
    }
    return this;
  }

  paginate() {
    const page = parseInt(this.queryStr.page) || 1;
    const limit = parseInt(this.queryStr.limit) || 5;
    const skip = (page - 1) * limit;
    this.query.skip(skip).limit(limit);
    return this;
  }
}

module.exports = GlobalFilter;
