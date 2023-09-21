<?php

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;


$mail = new PHPMailer(true);
$mail->CharSet = "UTF-8";
header("Content-type: application/json");

    //Content 
    $mail->setLanguage("ru", "phpmailer/language/");
    $mail->isHTML(true);        
    $mail->Subject = 'Заявка на конный поход с сайта altay-arkadia.ru';

    //Server settings
    $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
    $mail->isSMTP();                                            //Send using SMTP
    $mail->Host = $_ENV["MAIL_HOST"];                     //Set the SMTP server to send through
    $mail->SMTPAuth = true;                                   //Enable SMTP authentication
    $mail->Username = $_ENV["MAIL_USERNAME"]                     //SMTP username
    $mail->Password = $_ENV["MAIL_PASSWORD"]                               //SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
    $mail->Port = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

    // От кого письмо
    $mail->setFrom($_ENV["MAIL_USERNAME"], "Турприют \"Аркадия\"");
    // Кому письмо
    $mail->addAddress($_POST["email"]);
    $mail->addAddress($_ENV["MAIL_USERNAME"], "Заявка на конный поход!");

    // Тело письма
    $body = '<div style="padding:24px 0px;text-align:left;background-color:#77cfff38">';
    $body.="<a target='_blank' href='https://altay-arkadia.ru'style='display:block;width: 92px;margin:0px auto;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;text-decoration:none;color:#242132;font-size:14px'><img src='https://altay-arkadia-booking-page.ru/assets/arkadia_logo.png' alt='Логотип «Аркадия»' style='display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic' width='92px' data-title='Логотип «Аркадия»'></a>";
    $body.='<div style="width:90%;margin:4px auto;max-width:600px;height:60%;padding:24px;text-align:left;background-color:#fff;border-radius:20px">';
    $body.="<h1>Доброго времени суток, ".$_POST['firstName']."!</h1>";
    $body.="<h3>Вы оставили заявку на конный маршрут: ".$_POST["days"]." дней с ".$_POST["date"]."</h3>";
    $body.="<p>В ответном письме подтвердите, что получили это письмо и ваше желание поехать в поход серьезно и обдуманно.</p>";
    $body.="<p>Для подтверждения брони нужно будет заключить договор и оплатить аванс 10% от стоимости путевки.<br>";
    $body.="После ответа внесу вас в списки группы, подготовлю и вышлю документы.</p>";
    $body.="<p>Если вы у нас первый раз, пишите все ваши вопросы, все объясню.<br>";
    $body.="Жду вашего ответа!</p><br>";
    $body.="<p> --<br>С уважением, Ирина Тупицына.<br>+79126531089<br>ivan-altay@mail.ru<br>altay-arkadia@mail.ru<br><strong>Сохраняйте, пожалуйста, историю переписки!</strong><br>https://altay-arkadia.ru</p><br>";
    $body.="<h2>Данные бронирования:</h2>";
    $body.="<table>";

    if(trim(!empty($_POST['date']))){
        $body.="<tr><th>Дата заезда:</th><td>".$_POST["date"]."</td></tr>";
    }
    if(trim(!empty($_POST['days']))){
        $body.="<tr><th>Количество дней:</th><td>".$_POST["days"]."</td></tr>";
    }
    if(trim(!empty($_POST['firstName']))){
        $body.="<tr><th>Имя:</th><td> ".$_POST["firstName"]."</td></tr>";
    }
    if(trim(!empty($_POST['lastName']))){
        $body.="<tr><th>Фамилия:</th><td> ".$_POST["lastName"]."</td></tr>";
    }
    if(trim(!empty($_POST['phone']))){
        $body.="<tr><th>Телефон:</th><td> ".$_POST["phone"]."</td></tr>";
    }
    if(trim(!empty($_POST['email']))){
        $body.="<tr><th>Электронная почта:</th><td> ".$_POST["email"]."</td></tr>";
    }
    if(trim(!empty($_POST['city']))){
        $body.="<tr><th>Город:</th><td> ".$_POST["city"]."</td></tr>";
    }
    if(trim(!empty($_POST['participants']))){
        $chars = ['[',']','"'];
        $pieces = explode(";", str_replace($chars, "", $_POST['participants']));
        function trim_value(&$value){
            $value = trim($value," \t,");
        }
        array_walk($pieces, 'trim_value');
        $participants = implode(";<br>", $pieces);
        $body.="<tr><th>Данные участников:</th><td> ".$participants."</td></tr>";
    }
    if(trim(!empty($_POST['comment']))){
        $body.="<tr><th>Комментарий:</th><td> ".$_POST["comment"]."</td></tr>";
    }

    $body.="</table></div></div>";
    $mail->Body = $body;
    if($mail->Send()) {
        echo "Message has been sent!";
    }else {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
    $mail->smtpClose();   
?>
