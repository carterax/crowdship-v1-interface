export interface IModalDrawer {
  isOpen?: boolean;
  position?: 'top' | 'right' | 'bottom' | 'left';
  onClose?: () => void;
}
