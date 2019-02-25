package com.example.lab_windows.buscadorlibros;
import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import com.squareup.picasso.Picasso;

import org.json.JSONArray;
import org.json.JSONObject;
import org.w3c.dom.Text;

public class AdaptadorJSON extends BaseAdapter {
    private static final String url_base_img = "http://covers.opelibrary.org/b/id/";

    Context contexto;
    LayoutInflater vInflater;
    JSONArray json;

    public AdaptadorJSON(Context context, LayoutInflater inflater){
        contexto = context;
        vInflater = inflater;
        json = new JSONArray();
    }

    @Override
    public int getCount() {
        return json.length();
    }

    @Override
    public Object getItem(int i) {
        return json.optJSONObject(i);
    }

    @Override
    public long getItemId(int i) {
        return i;
    }

    @Override
    public View getView(int i, View view, ViewGroup viewGroup) {
        ViewHolder holder = null;

        if(view == null){
            view = vInflater.inflate(R.layout.fila, null);

            holder = new ViewHolder();
            holder.imagenView = (ImageView) view.findViewById(R.id.miniatura);
            holder.titutloView = (TextView) view.findViewById(R.id.titulo);
            holder.autorView = (TextView) view.findViewById(R.id.autor);
        }

        JSONObject objeto = (JSONObject) getItem(i);
        if(objeto.has("cover_i")){
            String imagenID = objeto.optString("cover_i");
            String imagenURL = url_base_img + imagenID + "-S.jpg";

            Picasso.with(contexto)
                    .load(imagenURL)
                    .placeholder(R.drawable.placeholder)
                    .into(holder.imagenView);
        } else{
            holder.imagenView.setImageResource(R.drawable.placeholder);
        }


        return view;
    }

    private  static class ViewHolder{
        public ImageView imagenView;
        public TextView titutloView;
        public TextView autorView;
    }
}
