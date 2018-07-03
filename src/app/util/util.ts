

export class Util {
    //public static URL_SERVER = 'http://180.124.152.20:3000';
    public static URL_SERVER = 'http://localhost:3000';

    public static  URL_CATEGORIAS  = `${ Util.URL_SERVER }/category`;
    public static  URL_MANUAL  = `${ Util.URL_SERVER }/manual`;
    public static  URL_MANUAL_HIST  = `${ Util.URL_SERVER }/manualHist`;
    public static  URL_NORMA  = `${ Util.URL_SERVER }/rule`;
    public static  URL_NORMA_HIST  = `${ Util.URL_SERVER }/ruleHist`;
    public static  URL_NOTICE  = `${ Util.URL_SERVER }/notice`;
    public static  URL_USER  = `${ Util.URL_SERVER }/user`;
    public static  URL_SECURITY  = `${ Util.URL_SERVER }/security`;
    public static  URL_STATS  = `${ Util.URL_SERVER }/stats`;




        //Constantes MsgBox
    public static SAVE_TITLE = "Guardar";
    public static DELETE_TITLE = "Eliminar";
    public static UPDATE_TITLE = "Editar";
    public static MSJ_SAVE_SUCCESS = "El registro ha sido guardado exitosamente";
    public static MSJ_UPDATE_SUCCESS = "El registro ha sido actualizado exitosamente";
    public static MSJ_DELETE_SUCCESS = "El regsitro ha sido eliminado exitosamente";
    public static MSJ_UPDATE_QUESTION = "¿Está seguro que desea actualizar el registro?";
    public static MSJ_DELETE_QUESTION = "¿Está seguro que desea eliminar el registro?";
    public static ERROR = "ERROR";
    public static OK_RESPONSE = "OK";
            
    //Tipos MsgBox
    public static  ACTION_INFO: string = "INFO";
    public static  ACTION_QUESTION: string = "QUESTION";  
    public static  ACTION_SUCCESS: string = "SUCCESS";
    public static  ACTION_DELETE: string = "DELETEE";
    public static  ACTION_UPDATE: string = "UPDATE";

    private binaryString: string;

    public static createFile(b64: string, name: string, mimeType: string): File{
        let str = b64.split(',')[1];
        let binary = atob(str.replace(/\s/g, ''));
        let len = binary.length;
        let buffer = new ArrayBuffer(len);
        let view = new Uint8Array(buffer);
        for (let i = 0; i < len; i++) {
            view[i] = binary.charCodeAt(i);
        }          
        let file = new File([view],name, {type: mimeType });
        return file;
    }

            
    
    getBinaryString (arc: File){    
        
        let reader = new FileReader();
        reader.readAsDataURL(arc);
        reader.onload = function() {
          this.binaryString = reader.result;
        }.bind(this); 
        
        return this.binaryString;
        
      }
         
}



