export default {
  categories: {
    food: {
      categories: {
        meat: {
          categories: {
            burgers: { collection: 'Burgers' },
            'deli-slices': { name: 'deli slices', collection: 'Deli Slices' },
            jackfruit: { collection: 'Jackfruit' },
            roasts: { collection: 'Roasts' },
            sausages: { collection: 'Sausages' },
            seitan: { collection: 'Seitan' }
          }
        },
        seafood: {
          categories: {
            salmon: { collection: 'Salmon' },
            tuna: { collection: 'Tuna' }
          }
        },
        cheese: {
          categories: {
            blocks: { collection: 'Blocks' },
            'cheese-wheels': {
              name: 'cheese wheels',
              collection: 'Cheese wheels'
            },
            mozzarella: { collection: 'Mozzarella' },
            'cream-cheese': { name: 'cream cheese', collection: 'Creamy cheese' },
            'shreds-and-toppings': { name: 'shreds and toppings', collection: 'Shreds and Toppings' },
            'cheese-slices': { name: 'cheese slices', collection: 'Cheese Slices' }
          }
        },
        'milk-cream-and-yogurt': {
          name: 'milk, cream and yogurt',
          categories: {
            milk: {
              categories: {
                'almond-milk': { name: 'almond milk', collection: 'Almond milk' },
                'flaxseed-milk': { name: 'flaxseed milk', collection: 'Flaxseed milk' },
                'hazelnut-milk': { name: 'hazelnut milk', collection: 'Hazelnut milk' },
                'hemp-milk': { name: 'hemp milk', collection: 'Hemp milk' },
                'macadamia-milk': { name: 'macadamia milk', collection: 'Macadamia milk' },
                'oat-milk': { name: 'oat milk', collection: 'Oat milk' },
                'soy-milk': { name: 'soy milk', collection: 'Soy milk' },
                'barista-style': { name: 'barista style', collection: 'Barista style' }
              }
            },
            yogurts: {
              collection: 'Yogurt'
            },
            'cream-and-creamers': {
              name: 'cream and creamers',
              categories: {
                cream: {
                  collection: 'Cream'
                },
                creamers: { collection: 'Creamers' }
              }
            }
          }
        },
        'butter-and-spreads': {
          name: 'butter and spreads',
          categories: {
            butter: { collection: 'Butter' },
            mayo: { collection: 'Mayo' },
            spreads: { collection: 'Spreads' }
          }
        },
        eggs: {
          collection: 'Eggs'
        }
      }
    },
    fashion: {
      categories: {
        men: {
          categories: {
            'men/trousers': { name: 'Trousers', collection: 'Men Trousers' },
            'T-Shirts': { collection: 'Men Tshirts' },
            'sweatshirts': { collection: 'Men Sweatshirts' },
            'men/footwear': {
              name: 'Footwear',
              categories: {
                sneakers: { collection: 'Men Footwear Sneakers' },
                boots: { collection: 'Men Footwear Boots' },
                shoes: { collection: 'Men Footwear Shoes' }
              }
            },
            accessories: {
              categories: {
                watches: { collection: 'Men Accessories Watches' }
              }
            }
          }
        },
        women: {
          categories: {
            'dresses': { collection: 'Women Dresses' },
            'skirts': { collection: 'Women Skirts' },
            'women/trousers': { name: 'Trousers', collection: 'Women Trousers' },
            'socks-and-tights': { name: 'Socks & Tights', collection: 'Women Socks and Tights' },
            'women/footwear': {
              name: 'Footwear',
              categories: {
                'boots': { collection: 'Women Boots' },
                'sandals': { collection: 'Women Sandals' },
                'shoes': { collection: 'Women Shoes' },
                'sneakers': { collection: 'Women Sneakers' }
              }
            },
            'coats-and-jackets': { name: 'Coats & Jackets', collection: 'Women Coats and Jackets' },
            accessories: {
              categories: {
                watches: { collection: 'Women Accessories Watches' },
                'bags': { collection: 'Women Bags' }
              }
            },
            tops: {
              categories: {
                't-shirts': { collection: 'Women Tshirts' },
                'sweaters': { collection: 'Women Sweaters' },
                'tops-and-blouses': { name: 'Tops & Blouses', collection: 'Women Tops And Blouses' }
              }
            }
          }
        },
        kids: {
          categories: {
            'clothes': { collection: 'Kids Clothes' }
          }
        }
      }
    },
    beauty: {
      categories: {
        haircare: {
          categories: {
            'shampoos': { collection: 'Haircare Shampoos' },
            'conditioners': { collection: 'Haircare Conditioners' }
          }
        },
        skincare: {
          categories: {
            'face': { collection: 'Skincare Face' },
            'body': { collection: 'Skincare Body' }
          }
        },
        makeup: {
          categories: {
            'face': { collection: 'Makeup Face' },
            'nails': { collection: 'Makeup Nails' },
            'lips': { collection: 'Makeup Lips' }
          }
        },
        perfumes: { collection: 'Perfumes' },
        teeth: {
          categories: {
            toothpaste: { collection: 'Teeth Toothpaste' },
            toothbrushes: { collection: 'Teeth Toothbrushes' },
            mouthwash: { collection: 'Teeth Mouthwash' }
          }
        },
        'bath-and-shower': {
          name: 'Bath & Shower',
          categories: {
            soap: { collection: 'Beauty Bath And Shower Soap' },
            shower: { collection: 'Beauty Bath And Shower Shower' }
          }
        }
      }
    },
    'home-and-living': {
      name: 'Home & Living',
      categories: {
        cleaning: { collection: 'Cleaning' },
        bedding: {
          categories: {
            'bed-linen': { name: 'Bed linen', collection: 'Home And Living Bedding Bed Linen' },
            'duvets': { collection: 'Home And Living Bedding Duvets' },
            'pillows': { collection: 'Home And Living Bedding Pillows' },
            'mattress-toppers': { name: 'Mattress toppers', collection: 'Home And Living Bedding Mattress Toppers' }
          }
        },
        kitchen: {
          categories: {
            storing: { collection: 'Home and Living Kitchen Storing' },
            cooking: { collection: 'Home and Living Kitchen Cooking' },
            'pan-and-pots': { name: 'Pan & Pots', collection: 'Home and Living Kitchen Pan And Pots' }
          }
        },
        decoration: {
          categories: {
            candles: { collection: 'Candles' }
          }
        }
      }
    },
    'magazine': { name: '#Magazine', collection: 'VU magazine' }
  }
}
