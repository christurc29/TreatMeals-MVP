


const itemSelectionBtn = document.querySelectorAll('#item-selection')
const itemSelectionRemoveBtn = document.querySelectorAll('.item-selection-remove')

const calories = []
const protein = []
const carbs = []
const fats = []
const mealItemsArray = []
let mealItems

let totalCals = 0;
let totalProtein = 0;
let totalCarbs = 0;
let totalFat = 0;

Array.from(itemSelectionBtn).forEach((el)=>{
    el.addEventListener('click', addToMealPlan)
})

Array.from(itemSelectionRemoveBtn).forEach((el)=>{
    el.addEventListener('click', removeFromMealPlan)
})



async function addToMealPlan(){
    const foodItemId = this.parentNode.dataset.id
    try{
        const response = await fetch(`/item-details/${foodItemId}`)
        const data = await response.json()
        calories.push(data.calories)
        protein.push(data.protein)
        carbs.push(data.totalcarbohydrates)
        fats.push(data.totalfat)
        mealItemsArray.push(data.title)

        let restaurant = data.restaurant

        console.log(calories)
        let totalCals = calories.reduce((a,b) => a + b, 0)
        console.log(totalCals)
        let totalProtein = protein.reduce((a,b) => a + b, 0)
        let totalCarbs = carbs.reduce((a,b) => a + b, 0)
        let totalFat = fats.reduce((a,b) => a + b, 0)

        loadCals(totalCals, totalProtein, totalCarbs, totalFat, restaurant)
        document.getElementById(`${foodItemId}`).classList.add('remove-visible')
        //location.reload()
    }catch(err){
        console.log(err)
    }

}

async function loadCals(totalCals, totalProtein, totalCarbs, totalFat, restaurant){
    const calories = totalCals
    const protein = totalProtein
    const carbs = totalCarbs
    const fat = totalFat

  const labels = [
    'Protein',
    'Carbs',
    'Fat',
  ];

  const data = {};

  const config = {};


    try{
         await fetch(`/feed/${restaurant}`)
        
            document.getElementById('calories').innerText = calories
            document.getElementById('protein').innerText = protein
            document.getElementById('carbs').innerText = carbs
            document.getElementById('fat').innerText = fat
            mealItems = mealItemsArray.join(', ')
            document.getElementById('meal-items').innerText = mealItems


            const data = {
                labels: labels,
                datasets: [{
                    label: 'My First Dataset',
                    data: [protein, carbs, fat],
                    backgroundColor: [
                      'rgb(255, 99, 132)',
                      'rgb(54, 162, 235)',
                      'rgb(255, 205, 86)'
                    ],
                    hoverOffset: 4
                  }]
              };
            
              const config = {
                type: 'doughnut',
                data: data,
                options: {labels: {
                    // render 'label', 'value', 'percentage', 'image' or custom function, default is 'percentage'
                    render: 'value',
            
                    // precision for percentage, default is 0
                    precision: 0,
            
                    // identifies whether or not labels of value 0 are displayed, default is false
                    showZero: true,
            
                    // font size, default is defaultFontSize
                    fontSize: 12,
            
                    // font color, can be color array for each data or function for dynamic color, default is defaultFontColor
                    fontColor: '#fff',
            
                    // font style, default is defaultFontStyle
                    fontStyle: 'normal',
            
                    // font family, default is defaultFontFamily
                    fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
            
                    // draw text shadows under labels, default is false
                    textShadow: true,
            
                    // text shadow intensity, default is 6
                    shadowBlur: 10,
            
                    // text shadow X offset, default is 3
                    shadowOffsetX: -5,
            
                    // text shadow Y offset, default is 3
                    shadowOffsetY: 5,
            
                    // text shadow color, default is 'rgba(0,0,0,0.3)'
                    shadowColor: 'rgba(255,0,0,0.75)',
            
                    // draw label in arc, default is false
                    // bar chart ignores this
                    arc: true,
            
                    // position to draw label, available value is 'default', 'border' and 'outside'
                    // bar chart ignores this
                    // default is 'default'
                    position: 'default',
            
                    // draw label even it's overlap, default is true
                    // bar chart ignores this
                    overlap: true,
            
                    // show the real calculated percentages from the values and don't apply the additional logic to fit the percentages to 100 in total, default is false
                    showActualPercentages: true,
            
                    // set images when `render` is 'image'
                    images: [
                      {
                        src: 'image.png',
                        width: 16,
                        height: 16
                      }
                    ],
            
                    // add padding when position is `outside`
                    // default is 2
                    outsidePadding: 4,
            
                    // add margin of text when position is `outside` or `border`
                    // default is 2
                    textMargin: 4
                  }
                }
              };

              if(myChart.value){
                myChart.value.destroy()
            }

         const ctx = document.getElementById('myChart')

           myChart.value =  new Chart(
                ctx,
                config)


        //location.reload()
    }catch(err){
        console.log(err)
    }
}


async function removeFromMealPlan(){
    const foodItemId = this.parentNode.dataset.id
    try{
        const response = await fetch(`/item-details/${foodItemId}`)
        const data = await response.json()

        let restaurant = data.restaurant
        let idxCal = calories.findIndex(p => p == data.calories);
        let idxProtein = protein.findIndex(p => p == data.protein)
        let idxCarbs = carbs.findIndex(p => p == data.totalcarbohydrates)
        let idxFats = fats.findIndex(p => p == data.totalfat)
        let idxMeals = mealItemsArray.findIndex(p => p == data.title)

        
        if(idxCal == -1){
            calories.splice(0, 0)
            idxCal = calories.findIndex(p => p == data.calories);
            if(idxCal == -1) {
                document.getElementById(`${foodItemId}`).classList.remove('remove-visible')
            }
        }else{
            calories.splice(idxCal, 1)
            idxCal = calories.findIndex(p => p == data.calories);
            if(idxCal == -1) {
                document.getElementById(`${foodItemId}`).classList.remove('remove-visible')
        }
    }

        if(idxProtein == -1){
            protein.splice(0, 0)
        }else{
            protein.splice(idxCal, 1)
        }

        if(idxCarbs == -1){
            carbs.splice(0, 0)
        }else{
            carbs.splice(idxCal, 1)
        }

        if(idxFats == -1){
            fats.splice(0, 0)
        }else{
            fats.splice(idxCal, 1)
        }

        if(idxMeals == -1){
            mealItemsArray.splice(0, 0)
        }else{
            mealItemsArray.splice(idxMeals, 1)
        }
        


        let totalCals = calories.reduce((a,b) => a + b, 0)
        console.log(totalCals)
        let totalProtein = protein.reduce((a,b) => a + b, 0)
        let totalCarbs = carbs.reduce((a,b) => a + b, 0)
        let totalFat = fats.reduce((a,b) => a + b, 0)

        loadCals(totalCals, totalProtein, totalCarbs, totalFat, restaurant)

        //location.reload()
    }catch(err){
        console.log(err)
    }

}



