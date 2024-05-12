const x =fetch("https://restcountries.com/v3.1/all")
.then((res)=>res.json())
.then(data=> {
    console.log(data)
    let countries = data;
    let cardContainer= document.getElementById("card-container")
    const row = document.createElement('div');
    row.classList.add('row');

    countries.forEach(country => {
       

        const col = document.createElement('div');
        col.classList.add('col-sm-6');
         col.classList.add('col-md-4');
        col.classList.add('col-lg-4');
        col.classList.add('col-xl-4');
        const card = document.createElement('div');
        card.classList.add('card');
        card.classList.add('mx-3')
        card.classList.add('my-3')
        card.classList.add('h-100')

        
      
        
    
        const image = document.createElement('img');
        image.classList.add('card-img-top');
        image.src = country.flags.png;
        image.alt = country.flags.alt;


        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body')
        const cardHeader=document.createElement('div')
        cardHeader.classList.add('card-header')

        const cardTitle = document.createElement('h2');
        cardTitle.classList.add('card-title')
        cardTitle.classList.add('text-center')
        cardTitle.textContent = country.name.common;
        cardHeader.appendChild(cardTitle)
        cardBody.appendChild(cardHeader)

        
        cardBody.appendChild(image);

        const cardContent2 = document.createElement('div');
        cardContent2.classList.add('card-text')
        cardContent2.classList.add('text-center')
        cardContent2.textContent = 'Region: '+country.region;
        cardBody.appendChild(cardContent2)

        const cardContent = document.createElement('div');
        cardContent.classList.add('card-text')
        cardContent.classList.add('text-center')
        cardContent.textContent = 'Capital: '+country.capital?.[0];
        cardBody.appendChild(cardContent)

        
        
        const cardContent3 = document.createElement('div');
        cardContent3.classList.add('card-text')
        cardContent3.classList.add('text-center')
        cardContent3.classList.add('latitude')
        cardContent3.id='latitude'
        cardContent3.textContent = 'Latitude: '+country.capitalInfo.latlng?.[0];
        cardBody.appendChild(cardContent3)

        const cardContent4 = document.createElement('div');
        cardContent4.classList.add('card-text')
        cardContent4.classList.add('text-center')
        cardContent4.classList.add('longitude')
        cardContent4.id='longitude'
        cardContent4.textContent = 'Longitude: '+ country.capitalInfo.latlng?.[1];
        cardBody.appendChild(cardContent4)

        const cardContent5 = document.createElement('div');
        cardContent5.classList.add('card-text')
        cardContent5.classList.add('text-center')
        cardContent5.textContent = 'Country code: '+ country.cca3;
        cardBody.appendChild(cardContent5)

        const nativeName = document.createElement('div');
        nativeName.classList.add('card-text')
        nativeName.classList.add('text-center')
        nativeName.id='native-name'
        let name = ''
        if(country.name.nativeName?.ron?.official){
            name=country.name.nativeName?.ron?.official
        } else {
            name=country.name.nativeName?.eng?.official
        }
        nativeName.textContent = 'Native Name : '+ (name?name:'');
        cardBody.appendChild(nativeName)

        const population = document.createElement('div');
        population.classList.add('card-text')
        population.classList.add('text-center')
        population.id='populatiion'
        population.textContent = 'Population : '+ country.population;
        cardBody.appendChild(population)

        const buttonDiv = document.createElement('div');
        buttonDiv.classList.add('text-center')

        const cardContent6= document.createElement('button');
        cardContent6.classList.add('btn')
        cardContent6.classList.add('btn-primary')
        cardContent6.type = 'button'
        cardContent6.id='weather-button';
        cardContent6.innerText = 'Click for Weather';
        buttonDiv.appendChild(cardContent6);
        cardBody.appendChild(buttonDiv)
        card.appendChild(cardBody);
        
        col.appendChild(card)
        row.appendChild(col);
        cardContainer.appendChild(row)
})
}).then(()=>{
    var button=document.getElementsByClassName('btn')
    Array.from(button).forEach(ele=>{
        ele.addEventListener('click',(event)=>{
            const clickedButton = Array.from(button).indexOf(ele)
            event.stopPropagation();
            const lat=Array.from(document.getElementsByClassName('latitude'))[clickedButton].innerText.split('Latitude: ')[1]
            const lon=Array.from(document.getElementsByClassName('longitude'))[clickedButton].innerText.split('Longitude: ')[1]
            const API_key='6c5bf590fea6c9df3b5618e9fdc1b8c2'
        const URL="https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid="+API_key;
        fetch(URL)
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(document.getElementById('weatherModal')){
                document.getElementById("card-container").removeChild(document.getElementById('weatherModal'))
            }
            
            const modalDiv = document.createElement('dialog')
            modalDiv.id='weatherModal'
            // modalDiv.classList.add('modal')
            // modalDiv.classList.add('fade')
            const modalDialog = document.createElement('div')
            modalDialog.classList.add('modal-dialog')
            modalDialog.role='document'
            const modalcontent = document.createElement('div')
            modalcontent.classList.add('modal-content')
            const modalHeader = document.createElement('div')
            modalHeader.classList.add('modal-header')
            const modalTitle = document.createElement('h5')
            modalTitle.textContent='Weather Information'
            modalHeader.appendChild(modalTitle)
            const modalBody = document.createElement('div')
            modalBody.classList.add('modal-body')
            const temperature = document.createElement('p')
            temperature.textContent='Temperature: '+data.main.temp+'K'
            modalBody.appendChild(temperature)
    
            const humidity = document.createElement('p')
            humidity.textContent='Humidity: '+data.main.humidity
            modalBody.appendChild(humidity)
    
            const maxtemp = document.createElement('p')
            maxtemp.textContent='Max Temperature: '+data.main.temp_max+'K'
            modalBody.appendChild(maxtemp)
    
            const mintemp = document.createElement('p')
            mintemp.textContent='Minimum Temperature: '+data.main.temp_min+'K'
            modalBody.appendChild(mintemp)
    
            const pressure = document.createElement('p')
            pressure.textContent='Pressure: '+data.main.pressure
            modalBody.appendChild(pressure)
    
            const description = document.createElement('p')
            description.textContent='Description: '+data.weather?.[0].description
            modalBody.appendChild(description)
    
            const modalFooter = document.createElement('div')
            modalFooter.classList.add('modal-footer')
            const dialogClose= document.createElement('button');
            dialogClose.classList.add('btn')
            dialogClose.classList.add('btn-primary')
            dialogClose.setAttribute('data-bs-dismiss','Modal')
            dialogClose.type = 'button'
            dialogClose.id='close'
            dialogClose.innerText='Close'
            modalFooter.appendChild(dialogClose)
    
            modalcontent.appendChild(modalHeader)
            modalcontent.appendChild(modalBody)
            modalcontent.appendChild(modalFooter)
            modalDialog.appendChild(modalcontent)
            modalDiv.appendChild(modalDialog)
            document.getElementById("card-container").appendChild(modalDiv)
            document.getElementById("weatherModal").showModal();
    
            document.getElementById('close').addEventListener("click", () => {
                document.getElementById("weatherModal").close();
                document.getElementById("card-container").removeChild(document.getElementById('weatherModal'))
              });
    
        })
        .catch(err=>console.log(err))
        })
    })
})
.catch(err=>console.log(err))


