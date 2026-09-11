<?php

require_once 'conexao.php';

$jogador1 = $_POST['jogador1'] ?? '';
$jogador2 = $_POST['jogador2'] ?? '';
$tempo = $_POST['tempo'] ?? 0;

$jogador1 = trim($jogador1);
$jogador2 = trim($jogador2);
$tempo = (int) $tempo;

if ($jogador1 === '' || $jogador2 === '') {
    echo json_encode([
        'sucesso' => false,
        'mensagem' => 'Preencha os nomes dos dois jogadores.'
    ]);
    exit;
}

try {

    $sql = "INSERT INTO ranking 
            (jogador_1, jogador_2, tempo, data)
            VALUES 
            (:jogador1, :jogador2, :tempo, :data)";

    $stmt = $db->prepare($sql);

    $stmt->execute([
        ':jogador1' => $jogador1,
        ':jogador2' => $jogador2,
        ':tempo' => $tempo,
        ':data' => date('Y-m-d H:i:s')
    ]);

    echo json_encode([
        'sucesso' => true,
        'mensagem' => 'Pontuação salva com sucesso!'
    ]);

} catch (PDOException $e) {

    echo json_encode([
        'sucesso' => false,
        'mensagem' => 'Erro ao salvar pontuação.'
    ]);
}

?>