package com.example.lab_windows.buscadorlibros;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.ImageView;

import com.squareup.picasso.Picasso;

public class DetailActivity extends AppCompatActivity {

    private static final String BASE_URL_CUBIERTA = "http://covers.openlibrary.org/b/id/";
    String cubiertaURL;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_detail);

        ImageView cubierta = (ImageView) findViewById(R.id.cubierta);

        String cubiertaID = this.getIntent().getExtras().getString("cubiertaID");
        if(cubiertaID.length() > 0){
            cubiertaURL = BASE_URL_CUBIERTA + cubiertaID + "-L.jpg";
            Picasso.with(this).load(cubiertaURL)
                    .placeholder(R.drawable.wait)
                    .into(cubierta);
        }
    }
}
