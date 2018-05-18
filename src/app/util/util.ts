

export class Util {
    //public static URL_SERVER = 'http://180.124.152.20:3000';
    public static URL_SERVER = 'http://localhost:3000';

    public static  URL_CATEGORIAS  = `${ Util.URL_SERVER }/category`;
    public static  URL_MANUAL  = `${ Util.URL_SERVER }/manual`;
    public static  URL_NORMA  = `${ Util.URL_SERVER }/rule`;



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
    
         
}



