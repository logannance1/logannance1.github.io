const data = `
  [
    {
      "title": "The Adventures of Kimble Bent",
      "author": "James Cowan",
      "price": 9.99,
      "review": "I think it's pretty cool how he went on adventures.",
      "reviewAuthor": "Somme Guye",
      "image": "images/the-adventures-of-kimble-bent.jpg"
    },
    {
      "title": "12 The Elements of Great Managing",
      "author": "Jim Harter",
      "price": 14.99,
      "review": "This really helped me!",
      "reviewAuthor": "Alexander the Great",
      "image": "images/12-the-elements-of-great-managing.jpg"
    },
    {
      "title": "Ohio Manual of Uniform Traffic Control Devices",
      "author": "Ohio Department of Transportation",
      "price": 999.99,
      "review": "I wish I could write plays as good as this.",
      "reviewAuthor": "William Shakespeare",
      "image": "images/ohio-manual-of-uniform-traffic-control-devices.jpg"
    }
  ]
`;

class Book {
  #title;
  #author;
  #price;
  #review;
  #reviewAuthor;
  #image;
  
  constructor(title, author, price, review, reviewAuthor, image) {
    this.#title = title;
    this.#author = author;
    this.#price = price;
    this.#review = review;
    this.#reviewAuthor = reviewAuthor;
    this.#image = image;
  }

  get title() { return this.#title; }
  get author() { return this.#author; }
  get price() { return this.#price; }

  set price(value) {
    this.#price = value < 0 ? 0 : value;
  }

  get review() { return this.#review; }
  get reviewAuthor() { return this.#reviewAuthor; }
  get image() { return this.#image; }

  toString() {
    return `
      ${this.title}
      By ${this.author}
      $${this.price}
      "${this.review}" - ${this.reviewAuthor ?? 'Unknown'}
      ${this.image}
    `;
  }

  generateHtml() {
    const img = document.createElement('img');
    img.src = this.image;

    const h3 = document.createElement('h3');
    h3.textContent = `Title: ${this.title}`;

    const h4 = document.createElement('h4');
    h4.textContent = `Author: ${this.author}`;

    const p = document.createElement('p');
    p.textContent = `Price: $${this.price}`;

    const rev = document.createElement('p');
    rev.textContent = `Review: "${this.review}" - ${this.reviewAuthor}`;

    const rightDiv = document.createElement('div');
    rightDiv.appendChild(h3);
    rightDiv.appendChild(h4);
    rightDiv.appendChild(p);
    rightDiv.appendChild(rev);
    
    const outerDiv = document.createElement('div');
    outerDiv.className = 'book';
    outerDiv.appendChild(img);
    outerDiv.appendChild(rightDiv);
    document.getElementById('books').appendChild(outerDiv);
  }
}

window.addEventListener('load', () => {
  const books = JSON.parse(data).map(b => new Book(b.title, b.author, b.price,
    b.review, b.reviewAuthor, b.image));

  books.forEach(b => b.generateHtml());
});
