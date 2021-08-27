export class ServerConfig {
    
    public static PROTOCOL = "http";
    public static IP = "localhost";
    public static PORT = "3000";
    
    public static getServer() {
        return `${ServerConfig.PROTOCOL}://${ServerConfig.IP}:${ServerConfig.PORT}`;
    }
}