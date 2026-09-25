import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  MouseEventHandler,
  ReactNode,
} from "react";
import { Link } from "react-router-dom";
import { cn } from "../../lib/cn.ts";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
  children: ReactNode;
}

/** Renders a native <button>. */
export type ButtonAsButtonProps = ButtonBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    to?: never;
    href?: never;
  };

/** Renders a client-side <Link>. Only link-meaningful props are accepted. */
export interface ButtonAsLinkProps extends ButtonBaseProps {
  to: string;
  href?: never;
  id?: string;
  title?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

/** Renders a plain <a>. Accepts standard anchor attributes. */
export type ButtonAsAnchorProps = ButtonBaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "className"> & {
    href: string;
    to?: never;
  };

export type ButtonProps =
  ButtonAsButtonProps | ButtonAsLinkProps | ButtonAsAnchorProps;

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-primary text-primary-foreground hover:opacity-90",
  secondary: "bg-secondary text-secondary-foreground hover:opacity-90",
  outline: "border border-border bg-card hover:bg-muted-background",
  ghost: "hover:bg-muted-background",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-small",
  md: "px-5 py-2.5 text-body",
  lg: "px-7 py-3.5 text-body",
};

function buttonClasses(
  variant: ButtonVariant,
  size: ButtonSize,
  fullWidth: boolean,
  className?: string,
): string {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-md font-semibold",
    "transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-50",
    variantStyles[variant],
    sizeStyles[size],
    fullWidth && "w-full",
    className,
  );
}

/**
 * Generic button primitive with correct button-vs-link semantics:
 * <button> by default, client-side <Link> when `to` is given,
 * plain <a> when `href` is given.
 */
export function Button(props: ButtonProps): ReactNode {
  const {
    variant = "primary",
    size = "md",
    fullWidth = false,
    className,
    children,
  } = props;
  const classes = buttonClasses(variant, size, fullWidth, className);

  if (props.to !== undefined) {
    const { to, onClick, id, title } = props;
    return (
      <Link to={to} className={classes} onClick={onClick} id={id} title={title}>
        {children}
      </Link>
    );
  }

  if (props.href !== undefined) {
    // Strip button-only props; the rest are valid anchor attributes.
    const {
      variant: _variant,
      size: _size,
      fullWidth: _fullWidth,
      children: _children,
      ...anchorProps
    } = props;
    return (
      <a {...anchorProps} className={classes}>
        {children}
      </a>
    );
  }

  const {
    variant: _bVariant,
    size: _bSize,
    fullWidth: _bFullWidth,
    children: _bChildren,
    ...buttonProps
  } = props;
  return (
    <button type="button" {...buttonProps} className={classes}>
      {children}
    </button>
  );
}
