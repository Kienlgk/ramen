package com.example.baovy.ex3;

import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.KeyEvent;
import android.view.View;
import android.webkit.WebResourceError;
import android.webkit.WebResourceRequest;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ProgressBar;
import android.widget.TextView;

public class LoginActivity extends AppCompatActivity {

    private JSInterface ji;

    private SharedPreferences preferences;
    private SharedPreferences.Editor editor;

    private WebView wvLogin;
    private EditText userEdt;
    private EditText passEdt;
    private Button loginBtn;
    private TextView msg;
    private ProgressBar progressBar;

    private String username;
    private String password;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        preferences = getSharedPreferences("user", MODE_PRIVATE);
        editor = preferences.edit();

        ji = new JSInterface(this);

        wvLogin = (WebView) findViewById(R.id.webView);
        wvLogin.getSettings().setJavaScriptEnabled(true);
        wvLogin.addJavascriptInterface(ji, "Android");
        wvLogin.loadUrl("http://www.aao.hcmut.edu.vn/stinfo");
        wvLogin.setWebViewClient(new WebViewClient() {
            @Override
            public void onReceivedError(WebView view, WebResourceRequest request, WebResourceError error) {
                view.stopLoading();
                AlertDialog alertDialog = new AlertDialog.Builder(LoginActivity.this).create();
                alertDialog.setTitle("Error");
                alertDialog.setMessage("Check your internet connection and try again.");
                alertDialog.setButton(DialogInterface.BUTTON_POSITIVE, "Try Again", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        dialog.cancel();
                        wvLogin.reload();
                    }
                });
                alertDialog.setOnKeyListener(new DialogInterface.OnKeyListener() {
                    @Override
                    public boolean onKey(DialogInterface dialog, int keyCode, KeyEvent event) {
                        if (keyCode == KeyEvent.KEYCODE_BACK) {
                            finish();
                            dialog.dismiss();
                        }
                        return true;
                    }
                });

                alertDialog.show();
            }
        });

        msg = (TextView) findViewById(R.id.msg);

        userEdt = (EditText) findViewById(R.id.userEdt);
        passEdt = (EditText) findViewById(R.id.passEdt);

        progressBar = (ProgressBar) findViewById(R.id.progressBar);

        loginBtn = (Button) findViewById(R.id.loginBtn);
        loginBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                progressBar.setVisibility(View.VISIBLE);

                username = userEdt.getText().toString();
                password = passEdt.getText().toString();

                wvLogin.setWebViewClient(new WebViewClient() {
                    int loadCount = 0;

                    @Override
                    public void onPageFinished(WebView view, String url) {
                        if (loadCount == 0) {
                            String javascript = "javascript: var x = document.getElementById('username').value = '" + username + "';" +
                                    "var y = document.getElementById('password').value = '" + password + "';" +
                                    "var submitBtn = document.getElementsByClassName('btn-submit');" +
                                    "submitBtn[0].click();" +
                                    "var msg = document.getElementById('msg');" +
                                    "if (msg != null) {Android.setMessage(msg.innerHTML);}" +
                                    "if (document.title == 'My Bach Khoa') {Android.setLoggedIn(true);}";
                            view.loadUrl(javascript);
                        } else if (loadCount == 1) {
                            String javascript = "javascript: var msg = document.getElementById('msg');" +
                                    "if (msg != null) {Android.setMessage(msg.innerHTML);}" +
                                    "if (document.title == 'My Bach Khoa') {Android.setLoggedIn(true);}" +
                                    "location.reload();";
                            view.loadUrl(javascript);
                        }
                        if (ji.isLoggedIn()) {
                            progressBar.setVisibility(View.INVISIBLE);

                            editor.putString("username", username);
                            editor.putString("password", password);
                            editor.commit();

                            Intent intent = new Intent(getApplicationContext(), MainActivity.class);
                            finish();
                            startActivity(intent);
                        } else if (ji.getMessage() != null) {
                            progressBar.setVisibility(View.INVISIBLE);

                            msg.setVisibility(View.VISIBLE);
                            msg.setText("Các thông tin mà bạn cung cấp không đúng.");
                        }
                        loadCount++;
                    }
                });
                wvLogin.loadUrl("http://mybk.hcmut.edu.vn/my/homeSSO.action");
            }
        });

    }
}
