import { Menu as BaseMenu } from '@base-ui/react/menu'
import { Check, ChevronRight, Circle, MoreHorizontal } from 'lucide-react'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

import {
  getFrostedSurfaceClassName,
  useFrostedSurfaceBackgroundToneRef,
} from 'weimo-ui-core/components/frosted-surface'
import { cn } from 'weimo-ui-core/lib/utils'
import {
  menuItemVariants,
  type MenuItemVariant,
  type MenuItemStyleProps,
} from './menu-variants'

import 'weimo-ui-core/styles/frosted-surface.css'
import './menu.css'

export type { MenuItemVariant } from './menu-variants'

type WithStringClassName<T> = Omit<T, 'className'> & {
  className?: string
}

export type MenuProps<Payload = unknown> = BaseMenu.Root.Props<Payload>

export function Menu<Payload = unknown>(props: MenuProps<Payload>) {
  return <BaseMenu.Root {...props} />
}

export type MenuTriggerProps<Payload = unknown> = WithStringClassName<
  BaseMenu.Trigger.Props<Payload>
>

export function MenuTrigger<Payload = unknown>({
  className,
  ...props
}: MenuTriggerProps<Payload>) {
  return (
    <BaseMenu.Trigger
      className={cn('weimo-menu__trigger', className)}
      data-slot="menu-trigger"
      {...props}
    />
  )
}

type MenuPopupPositionerProps = Pick<
  BaseMenu.Positioner.Props,
  | 'align'
  | 'alignOffset'
  | 'anchor'
  | 'collisionAvoidance'
  | 'collisionBoundary'
  | 'collisionPadding'
  | 'disableAnchorTracking'
  | 'positionMethod'
  | 'side'
  | 'sideOffset'
  | 'sticky'
>

export type MenuPopupProps = WithStringClassName<BaseMenu.Popup.Props> &
  MenuPopupPositionerProps & {
    portalProps?: BaseMenu.Portal.Props
  }

export function MenuPopup({
  align = 'end',
  alignOffset,
  anchor,
  className,
  collisionAvoidance,
  collisionBoundary,
  collisionPadding,
  disableAnchorTracking,
  portalProps,
  positionMethod,
  side,
  sideOffset = 6,
  sticky,
  style,
  ...props
}: MenuPopupProps) {
  const { backgroundStyle, backgroundTone, setElementRef } =
    useFrostedSurfaceBackgroundToneRef<HTMLDivElement>(true)

  return (
    <BaseMenu.Portal {...portalProps}>
      <BaseMenu.Positioner
        align={align}
        alignOffset={alignOffset}
        anchor={anchor}
        className="weimo-menu__positioner"
        collisionAvoidance={collisionAvoidance}
        collisionBoundary={collisionBoundary}
        collisionPadding={collisionPadding}
        data-slot="menu-positioner"
        disableAnchorTracking={disableAnchorTracking}
        positionMethod={positionMethod}
        side={side}
        sideOffset={sideOffset}
        sticky={sticky}
      >
        <BaseMenu.Popup
          className={getFrostedSurfaceClassName(
            'weimo-menu__popup',
            'frosted-surface--bordered',
            className,
          )}
          data-background-tone={backgroundTone ?? undefined}
          data-slot="menu-popup"
          ref={setElementRef}
          style={{ ...style, ...backgroundStyle }}
          {...props}
        />
      </BaseMenu.Positioner>
    </BaseMenu.Portal>
  )
}

export type MenuGroupProps = WithStringClassName<BaseMenu.Group.Props>

export function MenuGroup({ className, ...props }: MenuGroupProps) {
  return (
    <BaseMenu.Group
      className={cn('weimo-menu__group', className)}
      data-slot="menu-group"
      {...props}
    />
  )
}

export type MenuGroupLabelProps = WithStringClassName<BaseMenu.GroupLabel.Props>

export function MenuGroupLabel({ className, ...props }: MenuGroupLabelProps) {
  return (
    <BaseMenu.GroupLabel
      className={cn('weimo-menu__group-label', className)}
      data-slot="menu-group-label"
      {...props}
    />
  )
}

export type MenuItemProps = WithStringClassName<BaseMenu.Item.Props> &
  MenuItemStyleProps

function getMenuItemClassName({
  className,
  inset,
  variant,
  extraClassName,
}: MenuItemStyleProps & {
  className?: string
  extraClassName?: string
}) {
  return cn(menuItemVariants({ inset, variant }), extraClassName, className)
}

function MenuCheckedItemContent({
  children,
  indicator,
  type,
}: {
  children?: ReactNode
  indicator?: ReactNode
  type: 'checkbox' | 'radio'
}) {
  const Indicator =
    type === 'checkbox'
      ? BaseMenu.CheckboxItemIndicator
      : BaseMenu.RadioItemIndicator

  return (
    <>
      <span className="weimo-menu__indicator" aria-hidden="true">
        <Indicator>
          {indicator ?? (type === 'checkbox' ? <Check /> : <Circle />)}
        </Indicator>
      </span>
      <span className="weimo-menu__item-content">{children}</span>
    </>
  )
}

export function MenuItem({ className, inset, variant, ...props }: MenuItemProps) {
  return (
    <BaseMenu.Item
      className={getMenuItemClassName({ inset, variant, className })}
      data-slot="menu-item"
      {...props}
    />
  )
}

export type MenuLinkItemProps = WithStringClassName<BaseMenu.LinkItem.Props> &
  MenuItemStyleProps

export function MenuLinkItem({
  className,
  inset,
  variant,
  ...props
}: MenuLinkItemProps) {
  return (
    <BaseMenu.LinkItem
      className={getMenuItemClassName({ inset, variant, className })}
      data-slot="menu-link-item"
      {...props}
    />
  )
}

export type MenuCheckboxItemProps = WithStringClassName<BaseMenu.CheckboxItem.Props> &
  MenuItemStyleProps & {
    indicator?: ReactNode
  }

export function MenuCheckboxItem({
  children,
  className,
  indicator,
  inset,
  variant,
  ...props
}: MenuCheckboxItemProps) {
  return (
    <BaseMenu.CheckboxItem
      className={getMenuItemClassName({ inset, variant, className })}
      data-slot="menu-checkbox-item"
      {...props}
    >
      <MenuCheckedItemContent indicator={indicator} type="checkbox">
        {children}
      </MenuCheckedItemContent>
    </BaseMenu.CheckboxItem>
  )
}

export type MenuRadioGroupProps = WithStringClassName<BaseMenu.RadioGroup.Props>

export function MenuRadioGroup({ className, ...props }: MenuRadioGroupProps) {
  return (
    <BaseMenu.RadioGroup
      className={cn('weimo-menu__radio-group', className)}
      data-slot="menu-radio-group"
      {...props}
    />
  )
}

export type MenuRadioItemProps = WithStringClassName<BaseMenu.RadioItem.Props> &
  MenuItemStyleProps & {
    indicator?: ReactNode
  }

export function MenuRadioItem({
  children,
  className,
  indicator,
  inset,
  variant,
  ...props
}: MenuRadioItemProps) {
  return (
    <BaseMenu.RadioItem
      className={getMenuItemClassName({ inset, variant, className })}
      data-slot="menu-radio-item"
      {...props}
    >
      <MenuCheckedItemContent indicator={indicator} type="radio">
        {children}
      </MenuCheckedItemContent>
    </BaseMenu.RadioItem>
  )
}

export type MenuSeparatorProps = WithStringClassName<BaseMenu.Separator.Props>

export function MenuSeparator({ className, ...props }: MenuSeparatorProps) {
  return (
    <BaseMenu.Separator
      className={cn('weimo-menu__separator', className)}
      data-slot="menu-separator"
      {...props}
    />
  )
}

export type MenuShortcutProps = ComponentPropsWithoutRef<'span'>

export function MenuShortcut({ className, ...props }: MenuShortcutProps) {
  return (
    <span
      className={cn('weimo-menu__shortcut', className)}
      data-slot="menu-shortcut"
      {...props}
    />
  )
}

export type MenuSubProps = BaseMenu.SubmenuRoot.Props

export function MenuSub(props: MenuSubProps) {
  return <BaseMenu.SubmenuRoot {...props} />
}

export type MenuSubTriggerProps = WithStringClassName<BaseMenu.SubmenuTrigger.Props> &
  MenuItemStyleProps & {
    chevron?: ReactNode
  }

export function MenuSubTrigger({
  children,
  chevron,
  className,
  inset,
  variant,
  ...props
}: MenuSubTriggerProps) {
  return (
    <BaseMenu.SubmenuTrigger
      className={getMenuItemClassName({
        inset,
        variant,
        extraClassName: 'weimo-menu__sub-trigger',
        className,
      })}
      data-slot="menu-sub-trigger"
      {...props}
    >
      <span className="weimo-menu__item-content">{children}</span>
      <span className="weimo-menu__sub-chevron" aria-hidden="true">
        {chevron ?? <ChevronRight />}
      </span>
    </BaseMenu.SubmenuTrigger>
  )
}

export type MenuSubPopupProps = MenuPopupProps

export function MenuSubPopup({
  align = 'start',
  alignOffset = -5,
  sideOffset = 0,
  ...props
}: MenuSubPopupProps) {
  return (
    <MenuPopup
      align={align}
      alignOffset={alignOffset}
      sideOffset={sideOffset}
      {...props}
    />
  )
}

type ActionMenuItemBase = {
  key: string
  label: ReactNode
  icon?: ReactNode
  inset?: boolean
  shortcut?: ReactNode
  variant?: MenuItemVariant
}

export type ActionMenuCommandItem = ActionMenuItemBase &
  Omit<MenuItemProps, 'children' | 'className' | 'inset' | 'onClick' | 'variant'> & {
    type?: 'item'
    className?: string
    onSelect?: MenuItemProps['onClick']
  }

export type ActionMenuLinkItem = ActionMenuItemBase &
  Omit<MenuLinkItemProps, 'children' | 'className' | 'inset' | 'variant'> & {
    type: 'link'
    className?: string
  }

export type ActionMenuCheckboxItem = ActionMenuItemBase &
  Omit<
    MenuCheckboxItemProps,
    'children' | 'className' | 'indicator' | 'inset' | 'variant'
  > & {
    type: 'checkbox'
    className?: string
    indicator?: ReactNode
  }

export type ActionMenuRadioItem = ActionMenuItemBase &
  Omit<
    MenuRadioItemProps,
    'children' | 'className' | 'indicator' | 'inset' | 'variant'
  > & {
    type: 'radio'
    className?: string
    indicator?: ReactNode
  }

export type ActionMenuSeparatorItem = Omit<MenuSeparatorProps, 'children'> & {
  type: 'separator'
  key: string
}

export type ActionMenuGroupItem = {
  type: 'group'
  key: string
  label?: ReactNode
  items: ActionMenuItem[]
  groupProps?: Omit<MenuGroupProps, 'children'>
  labelProps?: Omit<MenuGroupLabelProps, 'children'>
}

export type ActionMenuSubItem = ActionMenuItemBase & {
  type: 'sub'
  className?: string
  chevron?: ReactNode
  items: ActionMenuItem[]
  popupProps?: Omit<MenuSubPopupProps, 'children'>
  rootProps?: Omit<MenuSubProps, 'children'>
  triggerProps?: Omit<
    MenuSubTriggerProps,
    'chevron' | 'children' | 'className' | 'inset' | 'variant'
  >
}

export type ActionMenuItem =
  | ActionMenuCommandItem
  | ActionMenuLinkItem
  | ActionMenuCheckboxItem
  | ActionMenuRadioItem
  | ActionMenuSeparatorItem
  | ActionMenuGroupItem
  | ActionMenuSubItem

export type ActionMenuProps = Omit<MenuPopupProps, 'children' | 'render'> & {
  ariaLabel: string
  items: ActionMenuItem[]
  radioGroupProps?: Omit<MenuRadioGroupProps, 'children'>
  rootProps?: Omit<MenuProps, 'children'>
  triggerIcon?: ReactNode
  triggerProps?: Omit<MenuTriggerProps, 'children'>
}

function renderActionMenuItemContent({
  icon,
  label,
  shortcut,
}: ActionMenuItemBase) {
  return (
    <>
      {icon}
      {label}
      {shortcut ? <MenuShortcut>{shortcut}</MenuShortcut> : null}
    </>
  )
}

function renderActionMenuRadioItem(item: ActionMenuRadioItem) {
  const {
    icon,
    indicator,
    key,
    label,
    shortcut,
    type: _type,
    ...props
  } = item
  void _type

  return (
    <MenuRadioItem indicator={indicator} key={key} {...props}>
      {renderActionMenuItemContent({ ...item, icon, label, shortcut })}
    </MenuRadioItem>
  )
}

function renderActionMenuItems(
  items: ActionMenuItem[],
  radioGroupProps?: Omit<MenuRadioGroupProps, 'children'>,
): ReactNode[] {
  const renderedItems: ReactNode[] = []

  for (let index = 0; index < items.length; index += 1) {
    const item = items[index]

    if (item.type === 'radio') {
      const radioItems: ActionMenuRadioItem[] = []

      while (items[index]?.type === 'radio') {
        radioItems.push(items[index] as ActionMenuRadioItem)
        index += 1
      }

      index -= 1
      renderedItems.push(
        <MenuRadioGroup key={`radio-${radioItems[0]?.key}`} {...radioGroupProps}>
          {radioItems.map((radioItem) => renderActionMenuRadioItem(radioItem))}
        </MenuRadioGroup>,
      )
      continue
    }

    renderedItems.push(renderActionMenuItem(item, radioGroupProps))
  }

  return renderedItems
}

function renderActionMenuItem(
  item: Exclude<ActionMenuItem, ActionMenuRadioItem>,
  radioGroupProps?: Omit<MenuRadioGroupProps, 'children'>,
) {
  if (item.type === 'separator') {
    const { key, type: _type, ...props } = item
    void _type

    return <MenuSeparator key={key} {...props} />
  }

  if (item.type === 'group') {
    const { groupProps, items, key, label, labelProps } = item

    return (
      <MenuGroup key={key} {...groupProps}>
        {label ? <MenuGroupLabel {...labelProps}>{label}</MenuGroupLabel> : null}
        {renderActionMenuItems(items, radioGroupProps)}
      </MenuGroup>
    )
  }

  if (item.type === 'sub') {
    const {
      chevron,
      icon,
      items,
      key,
      label,
      popupProps,
      rootProps,
      shortcut,
      triggerProps,
      type: _type,
      ...props
    } = item
    void _type

    return (
      <MenuSub key={key} {...rootProps}>
        <MenuSubTrigger chevron={chevron} {...props} {...triggerProps}>
          {renderActionMenuItemContent({ ...item, icon, label, shortcut })}
        </MenuSubTrigger>
        <MenuSubPopup {...popupProps}>
          {renderActionMenuItems(items, radioGroupProps)}
        </MenuSubPopup>
      </MenuSub>
    )
  }

  if (item.type === 'checkbox') {
    const {
      icon,
      indicator,
      key,
      label,
      shortcut,
      type: _type,
      ...props
    } = item
    void _type

    return (
      <MenuCheckboxItem indicator={indicator} key={key} {...props}>
        {renderActionMenuItemContent({ ...item, icon, label, shortcut })}
      </MenuCheckboxItem>
    )
  }

  if (item.type === 'link') {
    const { icon, key, label, shortcut, type: _type, ...props } = item
    void _type

    return (
      <MenuLinkItem key={key} {...props}>
        {renderActionMenuItemContent({ ...item, icon, label, shortcut })}
      </MenuLinkItem>
    )
  }

  const { icon, key, label, onSelect, shortcut, type: _type, ...props } = item
  void _type

  return (
    <MenuItem key={key} onClick={onSelect} {...props}>
      {renderActionMenuItemContent({ ...item, icon, label, shortcut })}
    </MenuItem>
  )
}

export function ActionMenu({
  ariaLabel,
  items,
  radioGroupProps,
  rootProps,
  triggerIcon,
  triggerProps,
  ...popupProps
}: ActionMenuProps) {
  const { className: triggerClassName, render, ...triggerRestProps } = triggerProps ?? {}

  return (
    <Menu {...rootProps}>
      <MenuTrigger
        aria-label={ariaLabel}
        className={cn(!render && 'weimo-menu__default-trigger', triggerClassName)}
        render={render}
        {...triggerRestProps}
      >
        {triggerIcon ?? <MoreHorizontal aria-hidden="true" />}
      </MenuTrigger>
      <MenuPopup {...popupProps}>
        {renderActionMenuItems(items, radioGroupProps)}
      </MenuPopup>
    </Menu>
  )
}
