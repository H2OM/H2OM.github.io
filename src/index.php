<?php
    if(!empty($_POST['question']) && !empty($_POST['category']) && !empty($_POST['answer'])) {
        $clientIP = $_SERVER['REMOTE_ADDR'];
        $answers = json_decode(file_get_contents(__DIR__ . '/assets/answers.json'), true);

        $answers[$clientIP][] = [
            'answer' => htmlspecialchars(trim($_POST['answer'])),
            'category' => htmlspecialchars(trim($_POST['category'])),
            'question' => htmlspecialchars(trim($_POST['question']))
        ];

        file_put_contents(__DIR__ . '/assets/answers.json', json_encode($answers, JSON_PRETTY_PRINT));
        die;
    }
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href='/dist/css/style.css?v=1.1'>
    <script src='/dist/js/main.js?v=1.1' defer></script>
    <title>Questions</title>
</head>
<body>
<div id="root"></div>
</body>
</html>
