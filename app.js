window.confirm("               ****İSİM BUL****          1. Harfe bastıktan sonra kutunun rengi sarı olursa harf istenen isimde var yeri yanlış     2. Harfe basıldığında yeşil yanarsa harf var yeri doğru.     3. Beş harf girdikten sonra DENE tuşuna basın    4.yanlış harfe basıldığında SİL tuşuna basınız");
const tileDisplay=document.querySelector('.tile-container')
const keyboard=document.querySelector('.key-container')
const messageDisplay=document.querySelector('.message-container');
const messag=document.querySelector('.messag')

const wordles =['AHMET','BURAK','MURAT'
                ,'FATİH','ORHAN','KEMAL','OSMAN','TOLGA','ALPER','DENİZ','SAMED','SEMİH','KADİR','SEDAT','MÜJDE','İLKER','HARUN','ERHAN','YAKUP','CANER','İSMET','VEDAT','FARUK','BEYZA','SELİN','DİLAN','SİBEL','SİMGE','SERAP','YAREN','GAMZE','CANSU','AYFER','HACER','AHSEN','AYSUN','SEVGİ','LEMAN','YELİZ','TUĞÇE',]
const wordle=wordles[(Math.random()*wordles.length)|0]
const keys=['A','E','I','İ','O','Ö','U','Ü','B','C','Ç','D','F','G','Ğ','H','J','K','L','M','N','S','Ş','T','P','R','V','Y','Z','SİL','DENE','YENİ-OYUN']

const guessRows=[
    ['','','','','',],
    ['','','','','',],
    ['','','','','',],
    ['','','','','',],
    ['','','','','',],
    ['','','','','',]
]
let currentRow = 0;
let currentTile=0;
let isGameOver=false
 guessRows.forEach((guessRow,guessRowIndex) =>{
    const rowElement = document.createElement('div')
    rowElement.setAttribute('id','guessRow-'+guessRowIndex)
    guessRow.forEach((guess,guessIndex)=>{
        const tileElement =document.createElement('div')
        tileElement.setAttribute('id','guessRow-'+guessRowIndex+'-tile-'+guessIndex)
        tileElement.classList.add('tile')
        rowElement.append(tileElement)
    })
    tileDisplay.append(rowElement)
})


keys.forEach(key => {
    const buttonElement =document.createElement('button')
    buttonElement.textContent=key
    buttonElement.setAttribute('id',key)
    buttonElement.setAttribute('class','btn')
    buttonElement.addEventListener('click',()=>handleClick(key))
    keyboard.append(buttonElement)
})
const container=document.querySelector('.key-container');
container.addEventListener('click',function(e){
    if(e.target.classList.contains('btn')){
        e.target.classList.add('selected')
        displayMessage();
    }
})
const handleClick =(letter)=>{
    console.log('clicked',letter)
    if(letter ==='SİL'){
        deleteLetter()
        console.log('guessRows',guessRows)
        return
    }
    
    if (letter==='DENE')
    {
        cheeckRow ()
        console.log('guessRows',guessRows)
        return
    }
    if(letter=='YENİ-OYUN'){
    
       return refreshPage()
        
       
    }
    function refreshPage(){
        window.location.reload();
    } 
   addLetter(letter)
    console.log('guessRows',guessRows)
}

const addLetter =(letter)=>{
    if(currentTile<5 && currentRow<6){
        const tile =document.getElementById('guessRow-'+currentRow+'-tile-'+currentTile)
        tile.textContent=letter
        guessRows[currentRow][currentTile]=letter
        tile.setAttribute('data',letter)
         currentTile++;
         console.log('guessRows',guessRows)
    }

}
const deleteLetter =()=>{
    if (currentTile>0){
        currentTile--
    const tile=document.getElementById('guessRow-'+currentRow+'-tile-'+currentTile)
    tile.textContent=''
        guessRows[currentRow][currentTile]=''
        tile.setAttribute('data','')

    }
}

const cheeckRow = ()=>{
    const guess= guessRows[currentRow].join('')
if(currentTile >4){    
    console.log('guess is '+guess,' worlde is '+wordle)
    fliptile();
    if(wordle==guess){
        showMessage('TEBRİKLER')
        isGameOver=true
        return
    }else{
        if (currentRow>=5){
            isGameOver=true
            showMessage(wordle)
            return
        }
        if(currentRow < 5){
            currentRow++
            currentTile=0
        }
}
}}
const showMessage=(message)=>{
   const messageElement= document.createElement('p')
   messageElement.textContent=message
   
   messageDisplay.append(messageElement)
   setTimeout(() => messageDisplay.removeChild(messageElement), 2000);
}
 
const addColorToKey=(keyLetter,color)=>{
   const key= document.getElementById(keyLetter)
   key.classList.add(color)
}
const fliptile=()=>{
const rowTiles= document.querySelector('#guessRow-'+currentRow).childNodes
let checkWordle =wordle
const guess =[]
rowTiles.forEach(tile =>{ 
 guess.push({letter:tile.getAttribute('data'),color:'grey-overlay'})
})
guess.forEach((guess,index)=>{
    
   if(guess.letter==wordle[index]  ){  
    guess.color ='green-overlay'
    checkWordle =checkWordle.replace(guess.letter,'')
}
})
guess.forEach(guess =>{
    if(checkWordle.includes(guess.letter)){
        guess.color='yellow-overlay'
        checkWordle =checkWordle.replace(guess.letter,'')
    }
})
rowTiles.forEach((tile,index)=>{
    setTimeout(()=>{
        tile.classList.add('flip')
        tile.classList.add(guess[index].color)
        addColorToKey(guess[index].letter,guess[index].color)
    },500*index)
})
  
}
function displayMessage(){
    messag.classList.add('show');
    setTimeout(function(){
messag.classList.remove('show')
    },2000)
}
