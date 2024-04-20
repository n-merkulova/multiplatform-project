declare module '*.module.scss' {
  declare const styles: Record<string, string>;
  export default styles;
}

declare module '*.module.css' {
  declare const styles: Record<string, string>;
  export default styles;
}

declare module '*.scss';
declare module '*.css';
