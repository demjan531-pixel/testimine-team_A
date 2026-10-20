// MiniShop specification-driven Jest tests. Deliberate defects are not fixed here.
const {filterProducts,sortProducts,lineTotal,cartTotals,normalizeQuantity,discountRateFor,validateCheckout}=require('./shop-logic');
const PRODUCTS=[
{id:1,name:'Laptop Stand',price:29.9},
{id:2,name:'USB-C Hub',price:39},
{id:3,name:'Monitor 27"',price:249},
{id:4,name:'Wireless Mouse',price:24.5},
{id:5,name:'Webcam HD',price:89}
];
describe('filterProducts',()=>{
 test('UT-01 empty query returns all',()=>expect(filterProducts(PRODUCTS,'')).toEqual(PRODUCTS));
 test('UT-02 case-insensitive mouse query',()=>expect(filterProducts(PRODUCTS,'mouse').map(p=>p.name)).toEqual(['Wireless Mouse']));
 test('UT-03 no match returns []',()=>expect(filterProducts(PRODUCTS,'tablet')).toEqual([]));
 test('UT-04 undefined query returns all',()=>expect(filterProducts(PRODUCTS,undefined)).toEqual(PRODUCTS));
});
describe('sortProducts',()=>{
 test('UT-05 name A-Z',()=>expect(sortProducts(PRODUCTS,'name').map(p=>p.name)).toEqual(['Laptop Stand','Monitor 27"','USB-C Hub','Webcam HD','Wireless Mouse']));
 test('UT-06 ascending price cheapest first',()=>expect(sortProducts(PRODUCTS,'price-asc')[0].price).toBe(24.5));
 test('UT-07 descending price puts 249 before 89',()=>expect(sortProducts(PRODUCTS,'price-desc')[0].price).toBe(249));
 test('UT-08 sorting does not mutate input',()=>{const before=[...PRODUCTS];const result=sortProducts(PRODUCTS,'name');expect(PRODUCTS).toEqual(before);expect(result).not.toBe(PRODUCTS);});
});
describe('lineTotal',()=>{
 test.each([[39,2,78],[24.5,3,73.5],[0.1,3,0.3]])('UT-09 price %s qty %s -> %s',(price,qty,want)=>expect(lineTotal(price,qty)).toBe(want));
});
describe('cartTotals',()=>{
 const rows=[{price:39,qty:1},{price:24.5,qty:1}];
 test('UT-11 subtotal two items',()=>expect(cartTotals(rows).subtotal).toBe(63.5));
 test('UT-12 no discount',()=>expect(cartTotals(rows,0)).toEqual({subtotal:63.5,discount:0,total:63.5}));
 test('UT-13 percentage discount on whole basket',()=>expect(cartTotals(rows,.1)).toEqual({subtotal:63.5,discount:6.35,total:57.15}));
 test('UT-14 empty cart',()=>expect(cartTotals([],.1)).toEqual({subtotal:0,discount:0,total:0}));
 test('UT-15 qty three',()=>expect(cartTotals([{price:39,qty:3}])).toEqual({subtotal:117,discount:0,total:117}));
});
describe('normalizeQuantity',()=>{
 test.each([[3,3],['3',3],[2.7,2]])('UT-16 valid input %s -> %s',(value,want)=>expect(normalizeQuantity(value)).toBe(want));
 test.each([[0],[-5],['abc'],[''],[null]])('UT-17 invalid input %s -> 1',(value)=>expect(normalizeQuantity(value)).toBe(1));
});
describe('discountRateFor',()=>{
 test('UT-18 SAVE10',()=>expect(discountRateFor('SAVE10')).toBe(.1));
 test('UT-19 trim and lower case save20',()=>expect(discountRateFor(' save20 ')).toBe(.2));
 test('UT-20 unknown code',()=>expect(discountRateFor('UNKNOWN')).toBe(0));
});
describe('validateCheckout',()=>{
 const valid={name:'Mari Maasikas',email:'mari@example.com',address:'Pikk 1, Tallinn'};
 test('UT-21 valid fields return no errors',()=>expect(validateCheckout(valid)).toEqual({}));
 test('UT-22 empty fields report three errors',()=>expect(Object.keys(validateCheckout({})).sort()).toEqual(['address','email','name']));
 test.each([['M',true],['Ma',false]])('UT-23 name %s has error=%s',(name,hasError)=>expect(Boolean(validateCheckout({...valid,name}).name)).toBe(hasError));
 test.each([['mari'],['mari@'],['mari@example'],['mari maasikas@example.com']])('UT-24 invalid email %s is rejected',(email)=>expect(validateCheckout({...valid,email}).email).toBeDefined());
 // The whitespace-only address case belongs in the specification; kept as a separate additional test.
 test('UT-25 blank address',()=>expect(validateCheckout({...valid,address:' '}).address).toBeDefined());
});
