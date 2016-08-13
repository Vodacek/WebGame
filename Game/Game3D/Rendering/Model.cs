using System;
using Game3D.Helpers;
using Bridge.jQuery2;
using Bridge.Html5;

namespace Game3D.Rendering
{
    public class Model : IDrawable
    {
        private string fFileName;

        public Camera Camera
        {
            get
            {
                throw new NotImplementedException();
            }

            set
            {
                throw new NotImplementedException();
            }
        }

        public Model(string fileName)
        {
            fFileName = fileName;
        }

        public void Draw(string context, Vector3 position, Camera cam)
        {
            throw new NotImplementedException();
        }

        public void Load()
        {
            jQuery.Ajax(new AjaxOptions()
            {
                Url = fFileName,
                MimeType = "text",
                Success = blah,
                Error = error
            });
        }

        private void blah(object value, string state, jqXHR response)
        {
            Window.Alert(value.ToString());


        }
        private void error(jqXHR value, string state, string response)
        {
            Window.Alert(state);
        }
    }
}
