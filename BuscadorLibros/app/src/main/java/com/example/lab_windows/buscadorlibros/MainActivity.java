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
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import android.support.v7.widget.ShareActionProvider;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import com.loopj.android.http.AsyncHttpClient;
import com.loopj.android.http.JsonHttpResponseHandler;

import org.json.JSONObject;

import cz.msebera.android.httpclient.Header;


public class MainActivity extends AppCompatActivity {

    Button btnBuscar;
    TextView txtFrase;

    ShareActionProvider vShareActionProvider;
    private static final String QUERY_URL="https://openlibrary.org/search.json?q=";

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

        AsyncHttpClient cliente = new AsyncHttpClient();
        cliente.get(QUERY_URL + url, new JsonHttpResponseHandler(){
            @Override
            public void onSuccess(int statusCode, Header[] headers, JSONObject response){
                Toast.makeText(getApplicationContext(), "OK!", Toast.LENGTH_LONG).show();
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

}
