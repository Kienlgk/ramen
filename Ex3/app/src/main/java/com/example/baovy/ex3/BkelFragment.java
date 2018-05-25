package com.example.baovy.ex3;

import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.LinearLayout;
import android.widget.Toast;

public class BkelFragment extends Fragment {

    private LinearLayout root;

    public BkelFragment() {

    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View rootView = inflater.inflate(R.layout.fragment_bkel, container, false);

        root = (LinearLayout) rootView.findViewById(R.id.root);
        Toast.makeText(getActivity(), "Bkel Fragment", Toast.LENGTH_LONG).show();

        WebView bkelWebView = new WebView(getActivity());
        LinearLayout.LayoutParams lpWebView = new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT);
        root.addView(bkelWebView, lpWebView);

        bkelWebView.getSettings().setJavaScriptEnabled(true);
        bkelWebView.setWebViewClient(new WebViewClient() {
            @Override
            public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);
            }
        });
        bkelWebView.loadUrl("http://e-learning.hcmut.edu.vn");

        return rootView;
    }
}
