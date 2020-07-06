import { gql } from 'apollo-boost';

export const GET_HOMEPAGE_PRODUCTS = gql`
  query HompageProducts($limit: Int! = 6) {
    featuredProducts: products(
      limit: $limit
      sort: "createdAt:desc"
      where: { tags: { name: "featured" } }
    ) {
      name
      slug
      summary
      images {
        formats
      }
    }
    latestProducts: products(limit: $limit, sort: "createdAt:desc") {
      name
      slug
      summary
      images {
        formats
      }
    }
    categories(limit: 4, sort: "createdAt:asc") {
      name
      image {
        url
      }
    }
  }
`;

export const GET_PRODUCTS_BY_CATEGORY = gql`
  query Products($name: String!, $start: Int, $limit: Int) {
    products(
      where: { categories: { name_contains: $name } }
      start: $start
      limit: $limit
    ) {
      id
      name
      slug
      summary
      images {
        formats
      }
    }
  }
`;
