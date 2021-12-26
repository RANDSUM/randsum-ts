# Regarding Order

As of version 1.0.0, `randsum` will attempt to resolve modifiers to a dice roll in an order. Unless the [syntax](/RANDSUM_DICE_NOTATION.md) supports multiple values, it is unlikely you will be able to stack values (for instance, dice notation with multiple modifiers - `4d20+2+2` - will fail).

When resolving modifiers, randsum will do so in this order:

`reroll -> unique -> replace -> cap -> drop -> explode -> plus -> minus`
