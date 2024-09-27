const addBookButton = document.querySelector("#addBook");
const overLay = document.querySelector(".overLay");
const submitButton = document.querySelector("#submit");
const cards = document.querySelector(".cards");

let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;

  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${
      this.read ? "read" : "not read yet"
    }`;
  };
}

// 把书籍加入图书馆
function addBookToLibrary(book) {
  myLibrary.push(book);
  console.log(book.info());
}

// 清空卡片数据
function emptyInputs() {
  document.querySelector("#bookTitle").value = "";
  document.querySelector("#bookAuthor").value = "";
  document.querySelector("#bookPages").value = "";
  document.querySelector("#isRead").checked = false;
}

// 创建卡片进入网页
function createCard(book) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.title = book.title; // 添加这一行
  card.innerHTML = `
        <p>${book.title}</p>
        <p>${book.author}</p>
        <p>${book.pages}</p>
        <button class="changeRead">Read</button>
        <button class="remove">Remove</button>
    `;

  const removeButton = card.querySelector(".remove");
  const changeRead = card.querySelector(".changeRead");
  removeButton.addEventListener("click", function () {
    //删除与被删除卡片相对应的书籍
    myLibrary = myLibrary.filter((b) => b.title !== card.dataset.title); //删除与被删除卡片相对应的书籍
    console.log(myLibrary); // 检查当前的 myLibrary
    card.remove(); // 移除卡片
    console.log("你已经点击了移除");
  });
  changeRead.addEventListener("click", () => {
    changeRead.classList.toggle("changeRead-notRead");
    console.log(changeRead.classList);
  });

  cards.appendChild(card);
}

// 开启弹窗
addBookButton.addEventListener("click", function () {
  overLay.classList.add("active"); // 显示 overlay
});

// 提交创建当前书籍
submitButton.addEventListener("click", (e) => {
  const title = document.querySelector("#bookTitle").value;
  const author = document.querySelector("#bookAuthor").value;
  const pages = document.querySelector("#bookPages").value;
  const isRead = document.querySelector("#isRead").checked;

  if (isNaN(pages) || pages <= 0) {
    pagesInput.style.borderColor = "red"; // 改变边框颜色为红色
    e.preventDefault(); // 阻止提交

    pagesInput.disabled = true; // 禁用输入框
  } else {
    // 处理有效输入
  }
  // 创建书籍对象
  const newBook = new Book(title, author, pages, isRead);
  addBookToLibrary(newBook); // 添加书籍到库

  overLay.classList.remove("active");
  createCard(newBook);
  // 清空输入框
  emptyInputs();
});

