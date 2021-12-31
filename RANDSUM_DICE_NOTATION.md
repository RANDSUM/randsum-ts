# Randsum Dice Notation

## About

### What is Dice Notation?

[Dice Notation](https://en.wikipedia.org/wiki/Dice_notation) is a way of representing different dice rolls and mutations in a simple string. For instance, `4d20+2` means "roll four twenty-sided die, then add two".

However, more complex operations - "Drop highest, reroll 3's, and make sure the rolls are unique" - do not always have a well-understood spec. This document describes the more complicated syntax that `randsum` will recognize.

### Attribution

I looked high and wide for a consensus on a sort "Extended Standard Dice Notation", and could not find anything. The most extensive and thought-out documentation I found was for the game's [Sophie's Dice](https://sophiehoulden.com/dice/documentation/notation.html#keep). Much of that syntax has been mirrored here.

Thanks, [Sophie](https://www.patreon.com/SophieHoulden)! Your examples were invaluable. Consider buying their [games](https://sophieh.itch.io/)!

## Dice Notation

Dice Notation in `randsum` is**case-insensitive**. `2d8` and `2D8` both work equally well.

### Sides And Quantity

---

```markdown
Roll X number of Y sided die

XdY

Roll 4 twenty sided dice

4d20
```

In `randsum` :

```js
// Roll 6 twenty-sided die

randsum('6d20')
randsum(20, {
  quantity: 6,
})
randsum({
  sides: 20,
  quantity: 6,
})
```

### Plus

---

**Key: `+`**

Add values to the sum total of the rolled dice.

```markdown
Add 2 to the final result

4d20+2
```

In `randsum` :

```js
// Roll 6 twenty-sided die, add 5

randsum('6d20+5')
randsum(20, {
  quantity: 6,
  modifiers: [{ plus: 5 }],
})
randsum({
  sides: 20,
  quantity: 6,
  modifiers: [{ plus: 5 }],
})
```

### Minus

**Key: `-`**

Subtract values to the sum total of the rolled dice

```markdown
Subtract 2 from the final result

4d20-2
```

In `randsum` :

```js
// Roll 6 twenty-sided die, subtract 5

randsum('6d20-5')
randsum(20, {
  quantity: 6,
  modifiers: [{ minus: 5 }],
})
randsum({
  sides: 20,
  quantity: 6,
  modifiers: [{ minus: 5 }],
})
```

### Drop

---

Remove values from the pool of rolled dice

#### Highest

**Key: `h | H`**

Remove the highest value(s)

```markdown
Drop Highest Die

4d20H

Drop Highest 3 Die

4d20H3
```

In `randsum` :

```js
// Roll 6 twenty-sided die, drop highest

randsum('6d20H')
randsum(20, {
  quantity: 6,
  modifiers: [
    {
      drop: {
        highest: true,
      },
    }
  ]
})

randsum({
  sides: 20,
  quantity: 6,
  modifiers: [
    {
      drop: {
        highest: true,
      },
    }
  ]
})

// Roll 6 twenty-sided die, drop highest 3

randsum('6d20H3')
randsum(20, {
  quantity: 6,
  modifiers: [
    {
      drop: {
        highest: 3,
      },
    }
  ]
})
randsum({
  sides: 20,
  quantity: 6,
  modifiers: [
    {
      drop: {
        highest: 3,
      },
    }
  ]
})
```

#### Lowest

**Key: `l | L`**

Remove the lowest value(s)

```markdown
Drop Lowest Die

4d20L

Drop Lowest 3 Die

4d20L3
```

In `randsum` :

```js
// Roll 6 twenty-sided die, drop lowest

randsum('6d20L')
randsum(20, {
  quantity: 6,
  modifiers: [
    {
      drop: {
        lowest: true,
      },
    }
  ]
})
randsum({
  sides: 20,
  quantity: 6,
  modifiers: [
    {
      drop: {
        lowest: true,
      },
    }
  ]
})

// Roll 6 twenty-sided die, drop lowest 3

randsum('6d20L3')
randsum(20, {
  quantity: 6,
  modifiers: [
    {
      drop: {
        lowest: 3,
      },
    }
  ]
})
randsum({
  sides: 20,
  quantity: 6,
  modifiers: [
    {
      drop: {
        lowest: 3,
      },
    }
  ]
})
```

#### Greater Than, Less than, Exact

**Key: `d | D`**

Remove Dice greater than, lesser than, or equal to value(s)

```markdown
Drop rolls greater than 17

4d20D{>17}

Drop rolls less than 5

4d20D{<5}

Drop any die that rolls a 8 or a 12

4d20D{8,12}

Mix and Match!

4d20D{<5,>158,12}
```

In `randsum` :

```js
// Roll 6 twenty-sided die, drop less than 5, greater than 15, and all 10's

randsum('6d20D{<5,>15,10')
randsum(20, {
  quantity: 6,
  modifiers: [
    {
      drop: {
        greaterThan: 15,
        lessThan: 5,
        exactly: [10],
      }
    },
  ]
})
randsum({
  sides: 20,
  quantity: 6,
  modifiers: [
    {
      drop: {
        greaterThan: 15,
        lessThan: 5,
        exactly: [10],
      }
    },
  ]
})
```

### Cap

---

**Key: `c | C`**

Reduce all values above a certain value or increase all values below a certain value

```markdown
Cap rolls greater than 18 to be 18

4d20C>17

Cap rolls less than 4 to be 4

4d20C<4

Cap rolls less than 2 to be 2 and greater than 19 to be 19

4d20C<2>19
```

In `randsum` :

```js
// Roll 6 twenty-sided die, cap less than 5 and greater than 15

randsum('6d20C<5>15')
randsum(20, {
  quantity: 6,
  modifiers: [
    {
      cap: {
        greaterThan: 15,
        lessThan: 5,
      }
    },
  ]
})
randsum({
  sides: 20,
  quantity: 6,
  modifiers: [
    {
      cap: {
        greaterThan: 15,
        lessThan: 5,
      }
    },
  ]
})
```

### Reroll

---

**Key: `r | R`**

Reroll all values above, below, or equal to certain values

```markdown
Reroll rolls greater than 17

4d20R{>17}

Reroll rolls less than 5

4d20R{<5}

Reroll any die that rolls a 8 or a 12

4d20R{8,12}

Reroll any die that rolls a 8 or a 12, stop rerolling after 3

4d20R{8,12}3

Mix and Match!

4d20R{<5,>15,8,12}
```

In `randsum` :

```js
// Roll 6 twenty-sided die, reroll less than 5, greater than 15, and all 10's, no more than 3 rerolls

randsum('6d20R{<5,>15,10}3')
randsum(20, {
  quantity: 6,
  modifiers: [
    {
      reroll: {
        above: 15,
        below: 5,
        exactly: [10],
        maxReroll: 3,
      }
    },
  ]
})
randsum({
  sides: 20,
  quantity: 6,
  modifiers: [
    {
      reroll: {
        above: 15,
        below: 5,
        exactly: [10],
        maxReroll: 3,
      }
    },
  ]
})
```

### Replace

---

**Key: `v | V`**

Replace all values above, below, or equal to certain values with other values

```markdown
Replace any die that rolls a 8 with a 12

4d20V{8=12}

Replace rolls greater than 17 with 20

4d20V{>17=20}

Replace rolls less than 5 with 1

4d20V{<5=1}

Mix and Match!

4d20V{<5=1,>17=20,8=12}
```

In `randsum` :

```js
// Roll 6 twenty-sided die, replace less than 5 with 1, greater than 15 with 20, and all 10's with 2's

randsum('6d20v{<5=1,>15=20,10=2')
randsum(20, {
  quantity: 6,
  modifiers: [
    {
      replace: [
        {
          from: {
            above: 15,
          },
          to: 20,
        },
        {
          from: {
            below: 5,
          },
          to: 1,
        },
        {
          from: 10,
          to: 2,
        },
      ],
    }
  ]
})
randsum({
  sides: 20,
  quantity: 6,
  modifiers: [
    {
      replace: [
        {
          from: {
            above: 15,
          },
          to: 20,
        },
        {
          from: {
            below: 5,
          },
          to: 1,
        },
        {
          from: 10,
          to: 2,
        },
      ],
    }
  ]
})
```

### Unique

---

**Key: `u | U`**

Enforce all rolls in a given pool to be unique**Note: Rolls whose quantitiy of dice exceed the number of sides will fail!**

```markdown
Force all rolls to be unique

4d20U

Allow 5's and 10's to be repeated, keep all others unique

4d20U{5,10}
```

In `randsum` :

```js
// Roll 6 twenty-sided die, make them all unique

randsum('6d20U')
randsum(20, {
  quantity: 6,
  modifiers: [{ unique: true }],
})
randsum({
  sides: 20,
  quantity: 6,
  modifiers: [{ unique: true }],
})

// Roll 6 twenty-sided die, make them all unique, allow for repeated 5's and 10's

randsum('6d20U{5,10}')
randsum(20, {
  quantity: 6,
  modifiers: [
    {
      unique: {
        notUnique: [5, 10],
      }
    }
  ]
})
randsum({
  sides: 20,
  quantity: 6,
  modifiers: [
    {
      unique: {
        notUnique: [5, 10],
      }
    }
  ]
})
```

### Explode

---

**Key: `!`**

Roll additional dice whenever a die in the pool rolls its maximum value

````markdown
Roll an additional die every time you roll maximum value of a die

4d20!

In `randsum`:

```js
// Roll 6 twenty-sided die, explode them

randsum('6d20!')
randsum(20, { quantity: 6, modifiers: [{ explode: true }] })
randsum({ sides: 20, quantity: 6, modifiers: [{ explode: true }] })
```
````
