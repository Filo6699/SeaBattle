function AttackPacket(x: number, y: number) {
    return {
        "type": "attack",
        "position": [x, y]
    }
}