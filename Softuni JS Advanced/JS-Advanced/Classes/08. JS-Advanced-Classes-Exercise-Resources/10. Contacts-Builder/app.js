class Contact{
    constructor(firstName, lastName, phone, email){
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.email = email;
        this.article = "";
    }
    set online(value){
        console.log(this.article);
        const title = this.article.getElementsByClassName('title')[0];
        this.isOnline = value;
        if (this.isOnline){
            title.classList.add('online')
        } else{
            title.classList.remove('online');
        }
    }

    get online(){
        return this.value;
    }

    render(id){
        this.article = "";
        const article = document.createElement('article');
        const title = document.createElement('div');
        const info = document.createElement('div');
        const btn = document.createElement('button');
        info.innerHTML = `<span>☎ ${this.phone}</span><span>✉ ${this.email}</span>`;
        title.innerHTML = `${this.firstName + " " + this.lastName}`;
        title.classList.add("title");
        info.classList.add('info');
        info.style.display = "none";
        btn.innerText = 'ℹ';
        title.appendChild(btn);
        article.appendChild(title);
        article.appendChild(info);
        btn.addEventListener('click', toggle);
        this.article = article;

        document.getElementById('main').appendChild(article);

        function toggle(e){
            const article = e.target.parentElement.parentElement;
            const info = article.getElementsByClassName('info')[0];
            console.log(info)
            if (info.style.display == 'none'){
                info.style.display  = 'block';
            } else{
                info.style.display  = 'none';
            }
        }
    }
    
}


let contacts = [
    new Contact("Ivan", "Ivanov", "0888 123 456", "i.ivanov@gmail.com"),
    new Contact("Maria", "Petrova", "0899 987 654", "mar4eto@abv.bg"),
    new Contact("Jordan", "Kirov", "0988 456 789", "jordk@gmail.com")
  ];
  contacts.forEach(c => c.render('main'));
  
  // After 1 second, change the online status to true
  setTimeout(() => contacts[1].online = true, 2000);
  setTimeout(() => contacts[1].online = false, 4000);
  