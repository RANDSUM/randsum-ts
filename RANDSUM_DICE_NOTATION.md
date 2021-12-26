# Randsum Dice Notation

## About

### What is Dice Notation?

[Dice Notation](https://en.wikipedia.org/wiki/Dice_notation) is a way of representing different dice rolls and mutations in a simple string. For instance, `4d20+2` means "roll four twenty-sided die, then add two".

However, more complex operations - "Drop highest, reroll 3's, and make sure the rolls are unique" - do not always have a well-understood spec. This document describes the more complicated syntax that `randsum` will recognize.

### Attribution

I looked high and wide for a consensus on a sort "Extended Standard Dice Notation", and could not find anything. The most extensive and thought-out documentation I found was for the game's [Sophie's Dice](https://sophiehoulden.com/dice/documentation/notation.html#keep). Much of that syntax has been mirrored here.

Thanks, [Sophie](https://www.patreon.com/SophieHoulden)! Your examples were invaluable. Consider buying their [games](https://sophieh.itch.io/)!

### Regarding order

`randsum` will attempt to resolve modifiers in a particular order, *regardless of the order they appear in the Dice Notation*. Check out [Regarding Order](/ORDER.md) for more.

## Dice Notation

Dice Notation in `randsum` is **case-insensitive**. `2d8` and `2D8` both work equally well.

### Sides And Quantity

```md
Roll X number of Y sided die

XdY

Roll 4 twenty sided dice

4d20
```

In `randsum`:

```ts
// Roll 5 six-sided die

randsum('5d6')
randsum(6, { quantity: 5 })
randsum({ sides: 6, quantity: 5 })

```

### Plus

```md
Add 2 to the final result

4d20+2
```

In `randsum`:

```ts
// Roll 6 six-sided die, add 5

randsum('5d6+5')
randsum(6, { quantity: 5, plus: 5 })
randsum({ sides: 6, quantity: 5, plus: 5 })
```

### Minus

```md
Subtract 2 from the final result

4d20-2
```

In `randsum`:

```ts
// Roll 6 six-sided die, subtract 5

randsum('5d6-5')
randsum(6, { quantity: 5, minus: 5 })
randsum({ sides: 6, quantity: 5, minus: 5 })
```

### Drop

#### Highest

```md
Drop Highest Die

4d20H

Drop Highest 3 Die

4d20H3
```

In `randsum`:

```ts
// Roll 6 six-sided die, drop highest

randsum('5d6H')
randsum(6, { quantity: 5, drop: { highest: true }})
randsum({ sides: 6, quantity: 5, drop: { highest: true }})

// Roll 6 six-sided die, drop highest 3

randsum('5d6H3')
randsum(6, { quantity: 5, drop: { highest: 3 }})
randsum({ sides: 6, quantity: 5, drop: { highest: 3 }})

```

#### Lowest

```md
Drop Lowest Die

4d20L

Drop Lowest 3 Die

4d20L3
```

In `randsum`:

```ts
// Roll 6 six-sided die, drop lowest

randsum('5d6L')
randsum(6, { quantity: 5, drop: { lowest: true }})
randsum({ sides: 6, quantity: 5, drop: { lowest: true }})

// Roll 6 six-sided die, drop lowest 3

randsum('5d6L3')
randsum(6, { quantity: 5, drop: { lowest: 3 }})
randsum({ sides: 6, quantity: 5, drop: { lowest: 3 }})

```

#### Greater Than, Less than, Exact

```md
Drop Rolls greater than 17

4d20D{>17}

Drop Rolls less than 5

4d20D{<5}

Drop any die that rolls a 8 or a 12

4d20D{8,12}

Mix and Match!

4d20D{<5,>158,12}
```

In `randsum`:

```ts
// Roll 6 six-sided die, drop less than 5, greater than 15, and all 10's

randsum('5d6D{<5,>15,10')
randsum(6, { quantity: 5, drop: { greaterThan: 15, lessThan:5, exactly: [10] }})
randsum({ sides: 6, quantity: 5, drop: { greaterThan: 15, lessThan:5, exactly: [10] }})
```

### Cap
### Reroll
### Replace
### Unique
### Explode
