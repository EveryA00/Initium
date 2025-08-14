import React, { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { GridContainer, FilterContainer, SearchBar, FilterSelect, SortSelect, FilterSection, FilterLabel, NoResults } from "../styles/productGridStyledComponents";
import ProductCard from "./productCard";
import { ProductsContext } from "../context/ProductsContext";

const ProductGrid = () => {
  const { products, cart, removeFromCart, addToCart, updateQuantity } = useContext(ProductsContext) || {};
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Get search query from URL on component mount
  useEffect(() => {
    if (router.query.search) {
      setSearchQuery(router.query.search);
    }
  }, [router.query.search]);

  // Filter and sort products
  useEffect(() => {
    if (!products) return;

    let filtered = [...products];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product => {
        const name = (product.name || '').toLowerCase();
        const description = (product.description || '').toLowerCase();
        const query = searchQuery.toLowerCase();
        
        return name.includes(query) || description.includes(query);
      });
    }

    // Category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter(product => product.category === categoryFilter);
    }

    // Price filter
    if (priceFilter !== "all") {
      const [min, max] = priceFilter.split("-").map(Number);
      filtered = filtered.filter(product => {
        const price = parseFloat(product.price || 0);
        if (max) {
          return price >= min && price <= max;
        } else {
          return price >= min;
        }
      });
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return (a.name || '').localeCompare(b.name || '');
        case "price-low":
          return parseFloat(a.price || 0) - parseFloat(b.price || 0);
        case "price-high":
          return parseFloat(b.price || 0) - parseFloat(a.price || 0);
        case "popularity":
          return (b.popularity || 0) - (a.popularity || 0);
        default:
          return 0;
      }
    });

    setFilteredProducts(filtered);
  }, [products, searchQuery, categoryFilter, priceFilter, sortBy]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/productGrid?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  if (error) {
    return <p>Error fetching products: {error}</p>;
  }

  return (
    <div>
      <FilterContainer>
        <FilterSection>
          <FilterLabel>Search & Filter</FilterLabel>
          <SearchBar onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Search juices..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button type="submit">🔍</button>
          </SearchBar>
        </FilterSection>

        <FilterSection>
          <FilterLabel>Category</FilterLabel>
          <FilterSelect
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="fruit">Fruit Juices</option>
            <option value="vegetable">Vegetable Juices</option>
            <option value="wellness">Wellness Blends</option>
            <option value="detox">Detox Juices</option>
          </FilterSelect>
        </FilterSection>

        <FilterSection>
          <FilterLabel>Price Range</FilterLabel>
          <FilterSelect
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
          >
            <option value="all">All Prices</option>
            <option value="0-5">Under $5</option>
            <option value="5-10">$5 - $10</option>
            <option value="10-15">$10 - $15</option>
            <option value="15-999">Over $15</option>
          </FilterSelect>
        </FilterSection>

        <FilterSection>
          <FilterLabel>Sort By</FilterLabel>
          <SortSelect
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="name">Name A-Z</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="popularity">Most Popular</option>
          </SortSelect>
        </FilterSection>
      </FilterContainer>

      {filteredProducts.length === 0 ? (
        <NoResults>
          <h3>No products found</h3>
          <p>Try adjusting your search or filters</p>
        </NoResults>
      ) : (
        <GridContainer>
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              cart={cart}
              updateQuantity={updateQuantity}
            />
          ))}
        </GridContainer>
      )}
    </div>
  );
};

export default ProductGrid;
