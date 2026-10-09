// Joins class names, skipping anything falsy: cx(ui.button, isOutline && ui.buttonOutline)
export const cx = (...classes: (string | false | null | undefined)[]) =>
  classes.filter(Boolean).join(' ')
