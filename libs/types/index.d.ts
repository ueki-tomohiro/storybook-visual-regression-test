interface CSSModule {
  [key: string]: string;
}

declare module "*.css" {
  const styles: CSSModule;
  export = styles;
}
