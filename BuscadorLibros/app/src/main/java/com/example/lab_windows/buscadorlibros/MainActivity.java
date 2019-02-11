package com.example.lab_windows.buscadorlibros;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.widget.ShareActionProvider;
import android.widget.Toast;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import com.loopj.android.http.AsyncHttpClient;
import com.loopj.android.http.JsonHttpResponseHandler;

import org.json.JSONObject;

import cz.msebera.android.httpclient.Header;


public class MainActivity extends AppCompatActivity {

    ShareActionProvider vShareActionProvider;
    private static final String QUERY_URL="https://openlibrary.org/search.json?q=";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
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

            }
        });
    }
}
