<?php

require_once 'conexao.php';

try {

    $sql = "SELECT jogador_1, jogador_2, tempo
            FROM ranking
            ORDER BY tempo ASC
            LIMIT 10";

    $stmt = $db->query($sql);

    $ranking = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($ranking);

} catch (PDOException $e) {

    echo json_encode([
        'erro' => 'Erro ao buscar ranking.'
    ]);

}

?>