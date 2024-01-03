var lbl1 = document.getElementById("lbl1");
var lbl2 = document.getElementById("lbl2");
var lbl3 = document.getElementById("lbl3");
var CBT = document.getElementById("CBT-id");
var AT = document.getElementById("AT-id");
function Calculate(){
    fifo();
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

    lbl1.innerHTML = "Average Time For Run : " + AverageRun;
    lbl2.innerHTML = "Average Time For Answer : " + AverageAnswer;
    lbl3.innerHTML = "Average Time For Wait : " + AverageWait;
}