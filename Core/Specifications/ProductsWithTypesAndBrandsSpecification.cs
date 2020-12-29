using Core.Entities;

namespace Core.Specifications
{
    public class ProductsWithTypesAndBrandsSpecification : BaseSpecification<Products>
    {
        public ProductsWithTypesAndBrandsSpecification(ProductSpecParams productParms)
        :base(x =>
        (string.IsNullOrEmpty(productParms.Search) || x.Name.ToLower().Contains(productParms.Search)) &&
        (!productParms.BrandId.HasValue || x.ProductBrandId == productParms.BrandId) &&
        (!productParms.TypeId.HasValue || x.ProductTypeId == productParms.TypeId))
         
        {
            AddInclude(x => x.ProductType);
            AddInclude(x => x.ProductBrand);
            AddOrderBy(x => x.Name);
            ApplyPaging(productParms.PageSize * (productParms.PageIndex - 1), productParms.PageSize);

            if(!string.IsNullOrEmpty(productParms.Sort))
            {
                switch(productParms.Sort)
                {
                    case "priceAsc":
                        AddOrderBy(s => s.Price);
                        break;
                    case "priceDesc":
                        AddOrderByDescending(s => s.Price);
                        break;
                    default:
                        AddOrderBy(n => n.Name);
                        break;
                }
            }


        }

        public ProductsWithTypesAndBrandsSpecification(int id) 
        : base(x => x.Id == id)
        {
            AddInclude(x => x.ProductType);
            AddInclude(x => x.ProductBrand);

        }


    }
}