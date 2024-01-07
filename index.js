var lbl1 = document.getElementById("lbl1");
var lbl2 = document.getElementById("lbl2");
var lbl3 = document.getElementById("lbl3");
var lblError = document.getElementById("error");
var select = document.getElementById("Type-id");
var CBT = document.getElementById("CBT-id");
var AT = document.getElementById("AT-id");

function Calculate(){
    switch(select.value){
        case "fifo":
            lblError.innerHTML = "";
            fifo();
            break;
        case "sjf":
            lblError.innerHTML = "";
            sjf();
            break;
        case "srt":
            lblError.innerHTML = "";
            srt();
            break;
        default:
            lblError.innerHTML = "select one of fifo or sjf or srt";
            break;
    }
}
function fifo(){
    let AverageRun = 0,AverageAnswer = 0,AverageWait = 0;
    let data_cbt = CBT.value.toString();
    let cbt_to_array = data_cbt.split(" ");
    let data_at = AT.value.toString();
    let at_to_array = data_at.split(" ");
    let sum1 = 0,sum2 = 0,sum3 = 0;
    let PHashFinish = [];
    for (let i = 0; i < cbt_to_array.length; i++)
    {
        sum1 += parseInt(cbt_to_array[i]);
        PHashFinish[i] = 0;
    }
    for (let i = 0; i < cbt_to_array.length; i++)
        for (let j = 0; j <= i; j++)
            PHashFinish[i] += parseInt(cbt_to_array[j]);

    for (let i = 0; i < cbt_to_array.length; i++)
        sum2 += (parseInt(PHashFinish[i]) - parseInt(at_to_array[i]));

    for (let i = 0; i < cbt_to_array.length; i++)
        sum3 += (parseInt(PHashFinish[i]) - parseInt(at_to_array[i]) - parseInt(cbt_to_array[i]));

    AverageRun = sum1 / (cbt_to_array.length);
    AverageAnswer = sum2 / (cbt_to_array.length);
    AverageWait = sum3 / (cbt_to_array.length);

    putOnScreen(AverageRun,AverageAnswer,AverageWait);
}
function sjf(){
    let AverageRun = 0,AverageAnswer = 0,AverageWait = 0;
    let data_cbt = CBT.value.toString();
    let cbt_to_array = data_cbt.split(" ");
    let data_at = AT.value.toString();
    let at_to_array = data_at.split(" ");
    let sum1 = 0,sum2 = 0,sum3 = 0;
    let PHashFinish = [];
    let new_cbt = [];
    for (let i = 0; i < cbt_to_array.length; i++)
    {
        sum1 += parseInt(cbt_to_array[i]);
        new_cbt[i] = parseInt(cbt_to_array[i]); 
        PHashFinish[i] = 0;
    }

    new_cbt.splice(0,1);
    new_cbt.sort();
    new_cbt.splice(0,0,parseInt(cbt_to_array[0]));

    for (let i = 0; i < cbt_to_array.length; i++)
        for (let j = 0; j <= i; j++)
            PHashFinish[i] += new_cbt[j];

    for (let i = 0; i < cbt_to_array.length; i++)
        sum2 += (parseInt(PHashFinish[i]) - parseInt(at_to_array[i]));

    for (let i = 0; i < cbt_to_array.length; i++)
        sum3 += (parseInt(PHashFinish[i]) - parseInt(at_to_array[i]) - parseInt(cbt_to_array[i]));

    AverageRun = sum1 / (cbt_to_array.length);
    AverageAnswer = sum2 / (cbt_to_array.length);
    AverageWait = sum3 / (cbt_to_array.length);

    putOnScreen(AverageRun,AverageAnswer,AverageWait);
}
function srt(){
    let AverageRun = 0,AverageAnswer = 0,AverageWait = 0;
    let data_cbt = CBT.value.toString();
    let cbt_to_array = data_cbt.split(" ");
    let data_at = AT.value.toString();
    let at_to_array = data_at.split(" ");
    let sum1 = 0,sum2 = 0,sum3 = 0;
    let PHashFinish = [];
    let new_cbt = [];

    for (let i = 0; i < cbt_to_array.length; i++)
    {
        sum1 += parseInt(cbt_to_array[i]);
        new_cbt[i] = parseInt(cbt_to_array[i]); 
        PHashFinish[i] = 0;
    }
    let min = new_cbt[0];
    let minIndex = 0;
    for (let i = 0; i < cbt_to_array.length; i++) {
        if(new_cbt[i] < min){
            min = new_cbt[i];
            minIndex = i;
        }   
    }
    new_cbt[0] -= parseInt(at_to_array[minIndex]);
    new_cbt.sort();
    if(minIndex != 0){
        for (let i = 0; i < cbt_to_array.length; i++){
            for (let j = 0; j <= i; j++)
                PHashFinish[i] += new_cbt[j];
            PHashFinish[i] += parseInt(at_to_array[minIndex]);
        }
        console.log(PHashFinish);
        console.log(new_cbt);
        for (let i = 0; i < cbt_to_array.length; i++)
        sum2 += (parseInt(PHashFinish[i]) - parseInt(at_to_array[i]));

        for (let i = 0; i < cbt_to_array.length; i++)
        sum3 += (parseInt(PHashFinish[i]) - parseInt(at_to_array[i]) - parseInt(cbt_to_array[i]));

        AverageRun = sum1 / (cbt_to_array.length);
        AverageAnswer = sum2 / (cbt_to_array.length);
        AverageWait = sum3 / (cbt_to_array.length);

        putOnScreen(AverageRun,AverageAnswer,AverageWait);
    }
    else{
        sjf();
    }
}
function putOnScreen(valu1,valu2,valu3){
    lbl1.innerHTML = "Average Time For Run : " + valu1;
    lbl2.innerHTML = "Average Time For Answer : " + valu2;
    lbl3.innerHTML = "Average Time For Wait : " + valu3;
}