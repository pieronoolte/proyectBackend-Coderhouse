const paginateProducts = async (schema, size, page, sort) => {
  const options = {
    limit: size || 10,
    page: page || 1,
    sort: sort || { createdAt: -1 },
    lean: true
  };

  let result = await schema.paginate({},options);

  result.prevLink = result.hasPrevPage?`http://localhost:8080/api/products/paginate?page=${result.prevPage}`:'';
  result.nextLink = result.hasNextPage?`http://localhost:8080/api/products/paginate?page=${result.nextPage}`:'';

  result.isValid= !(page<=0||page>result.totalPages)
  // console.log(result)
  return result
}

module.exports = { paginateProducts }
