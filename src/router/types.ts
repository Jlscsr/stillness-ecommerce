import 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    /**
     * The title of the page for the browser tab and SEO
     */
    title?: string;
    
    /**
     * Whether the route requires authentication
     */
    requiresAuth?: boolean;
    
    /**
     * Whether the route is only accessible to guests (non-authenticated users)
     */
    guestOnly?: boolean;
    
    /**
     * Array of roles that have access to this route
     * Example: ['admin', 'editor']
     */
    roles?: string[];
    
    /**
     * Whether to hide the route from navigation menus
     */
    hidden?: boolean;
    
    /**
     * Icon for the route in navigation menus
     */
    icon?: string;
    
    /**
     * Any additional custom properties
     */
    [key: string]: unknown;
  }
}
