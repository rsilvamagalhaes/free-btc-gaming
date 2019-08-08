
var minstake = 0.00000001;  // valor base
//-----------------------------------------
var autorounds = 123;         // n° de rolls
var valor=$('#balance').text().replace(".", "").replace(/^0+/, '');
// Quantidade fixa de perda
var QTDADE_POSSO_PERDER=0.00000035;

var handbrake = 0.0001;  // valor lose pause game
var autoruns = 1;

function delay(ms) {
    ms += new Date().getTime();
    while (new Date() < ms){}
 }

function playnow() {

    if (autoruns > autorounds) { 
        console.log('Fim do jogo');
        var ultimoValor = $('#balance').text().replace(".", "").replace(/^0+/, '');;
        var ganhos = 0;
        var ganhos = ultimoValor - valor;
        if (ganhos > 5) {
            console.warn('Comecei com o valor de ' + valor);
            console.warn('E agora estou com ' + ultimoValor);
            console.warn('Ganhei essa rodada ' + ganhos + ' satoches');
            autoruns = 1;
            valor = ultimoValor;
            
            if (ganhos <= 7) {
                console.log('Estamos ganhando só ' + ganhos + ', aguardar 3 minutos para iniciar o game novamente.');
                $('.betting_link')[0].click()
                delay(180000);
            } else if (ganhos <= 10) {
                console.log('Estamos ganhando só ' + ganhos + ', aguardar 2 minutos para iniciar o game novamente.');
                $('.earn_btc_link')[0].click()
                delay(120000);
            } else if (ganhos <= 30) {
                console.log('Estamos ganhando só ' + ganhos + ', aguardar 1 minutos para iniciar o game novamente.');
                $('.earn_btc_link')[0].click()
                delay(60000);
            } else {
                $('.earn_btc_link')[0].click()
                console.log('Aguardando alguns millis para iniciar novamente, mas estamos ganhando '+ ganhos+'.');
                delay(10000);
            }

            console.log('Jogando novamente!!!');
            playnow();
        } else {
            console.warn('Comecei com o valor de ' + valor);
            console.warn('E agora estou com ' + ultimoValor);
            console.error('Deu ruim, estou parando aqui, perdi ' + ganhos + ' centavos');
            return; 
        }
    }
    document.getElementById('double_your_btc_bet_hi_button').click();
    setTimeout(checkresults, 123);
    return;
}
function checkresults() {
    if (document.getElementById('double_your_btc_bet_hi_button').disabled === true) {
        setTimeout(checkresults, 360);
        return;
    }
    var stake = document.getElementById('double_your_btc_stake').value * 1;
    var won = document.getElementById('double_your_btc_bet_win').innerHTML;
    if (won.match(/(\d+\.\d+)/) !== null) { won = won.match(/(\d+\.\d+)/)[0]; } else { won = false; }
    var lost = document.getElementById('double_your_btc_bet_lose').innerHTML;
    if (lost.match(/(\d+\.\d+)/) !== null) { lost = lost.match(/(\d+\.\d+)/)[0]; } else { lost = false; }
    if (won && !lost) { stake = minstake; console.warn('Jogo num #' + autoruns + '/' + autorounds + ': Ganhei  ' + won + ' Valor: ' + stake.toFixed(8)); }
    if (lost && !won) { stake = lost * 2.1; console.error('Jogo num #' + autoruns + '/' + autorounds + ': Perdi ' + lost + ' Valor: ' + stake.toFixed(8)); }
    if (!won && !lost) { console.log('Something went wrong'); return; }

    // Tratativa para perdas individuais
    if (lost >= QTDADE_POSSO_PERDER) {
        console.error('Deu ruim, estou parando por aqui.');
        console.error('Acabei de perder uma grana no valor de ' + lost + ' satoches ');
        return;
    }

    document.getElementById('double_your_btc_stake').value = stake.toFixed(8);
    autoruns++;
    if (stake >= handbrake) {
        document.getElementById('handbrakealert').play();
        console.log('Deu ruim, estou parando por aqui');
        return;
    }
    delay(1000);
    playnow();
    return;

} playnow()