package com.example.lab_windows.buscadorlibros;

import android.content.Intent;
import android.support.v4.view.MenuItemCompat;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.AdapterView;
import android.widget.Button;
import android.widget.FrameLayout;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import android.support.v7.widget.ShareActionProvider;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.List;

import com.loopj.android.http.AsyncHttpClient;
import com.loopj.android.http.JsonHttpResponseHandler;

import org.json.JSONArray;
import org.json.JSONObject;

import cz.msebera.android.httpclient.Header;


public class MainActivity extends AppCompatActivity implements AdapterView.OnItemClickListener {

    ShareActionProvider vShareActionProvider;
    private static final String QUERY_URL="https://openlibrary.org/search.json?q=";

    Button btnBuscar;
    TextView txtFrase;
    ListView lstLista;
    AdaptadorJSON adaptador;
    FrameLayout barraContenedor;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        btnBuscar = this.findViewById(R.id.btnBuscar);
        txtFrase = this.findViewById(R.id.txtFrase);

        btnBuscar.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View view){
                String frase = txtFrase.getText().toString();
                queryBooks(frase);
            }
        });

        Toolbar menu = (Toolbar)findViewById(R.id.toolbar);
        setSupportActionBar(menu);

        adaptador = new AdaptadorJSON(this, getLayoutInflater());
        lstLista = (ListView) findViewById(R.id.lista);
        lstLista.setAdapter(adaptador);
        lstLista.setOnItemClickListener(this);
    }

    private void queryBooks(String frase){
        String url = "";
        try{
            url= URLEncoder.encode(frase, "UTF-8");
        }
        catch(UnsupportedEncodingException e){
            e.printStackTrace();
            Toast.makeText(this, "Error."+e.getMessage(), Toast.LENGTH_LONG).show();
        }

        barraContenedor = (FrameLayout) findViewById(R.id.barraProgresoContenedor);
        barraContenedor.setVisibility(View.VISIBLE);
        AsyncHttpClient cliente = new AsyncHttpClient();
        cliente.get(QUERY_URL + url, new JsonHttpResponseHandler(){
            @Override
            public void onSuccess(int statusCode, Header[] headers, JSONObject response){
                Toast.makeText(getApplicationContext(), "OK!", Toast.LENGTH_LONG).show();
                adaptador.updateData(response.optJSONArray("docs"));
                barraContenedor.setVisibility(View.GONE);
                Log.d("Resultados", response.toString());
            }
            @Override
            public void onFailure(int statusCode, Header[] headers,Throwable throwable, JSONObject response){
                Toast.makeText(getApplicationContext(), "Error: "+ statusCode + " "+ throwable.getMessage(), Toast.LENGTH_LONG).show();
                Log.e("Noooooo!!!", statusCode + " " + throwable.getMessage());
            }
        });
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu){
        getMenuInflater().inflate(R.menu.menu, menu);

        MenuItem compartirItem = menu.findItem(R.id.menu_compartir);
        if(compartirItem != null){
            vShareActionProvider = (ShareActionProvider) MenuItemCompat.getActionProvider(compartirItem);
        }

        setShareIntent();
        return true;
    }

    public void setShareIntent(){
        if(vShareActionProvider != null){
            Intent shareIntent = new Intent(Intent.ACTION_SEND);
            shareIntent.setType("text/plain");
            shareIntent.putExtra(Intent.EXTRA_SUBJECT, "Buscador de Libros");
            shareIntent.putExtra(Intent.EXTRA_TEXT, "-Compartir-");

            vShareActionProvider.setShareIntent(shareIntent);
        }
    }

    @Override
    public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
        JSONObject objeto = (JSONObject) adaptador.getItem(i);
        String cubiertaID = objeto.optString("cover_i", "");

        Intent detailIntent = new Intent(this, DetailActivity.class);
        detailIntent.putExtra("cubiertaID", cubiertaID);
        startActivity(detailIntent);
    }
}
