package com.example.baovy.ex3;

import android.app.ProgressDialog;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.support.design.widget.AppBarLayout;
import android.view.View;
import android.support.design.widget.NavigationView;
import android.support.v4.view.GravityCompat;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.ActionBarDrawerToggle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.Menu;
import android.view.MenuItem;
import android.webkit.WebResourceError;
import android.webkit.WebResourceRequest;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.LinearLayout;
import android.widget.ProgressBar;
import android.widget.RelativeLayout;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.lang.reflect.Type;
import java.util.ArrayList;

public class MainActivity extends AppCompatActivity
        implements NavigationView.OnNavigationItemSelectedListener {

    private SharedPreferences preferences;
    private SharedPreferences.Editor editor;

    private JSInterface jsInterface;

    private String username;
    private String password;

    private ArrayList<Schedule> scheduleArrayList;
    private ArrayList<Grade> gradeArrayList;
    private ArrayList<Exam> examArrayList;

    private LinearLayout content_main;

    private WebView webView;

    private ProgressBar loading;

    private AppBarLayout apl;

    private RelativeLayout progressLayout;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        preferences = getSharedPreferences("user", MODE_PRIVATE);
        editor = preferences.edit();

        username = preferences.getString("username", "");
        password = preferences.getString("password", "");

        if (username == "" && password == "") {
            Intent intent = new Intent(this, LoginActivity.class);
            finish();
            startActivity(intent);
        } else {
            apl = (AppBarLayout) findViewById(R.id.appBarLayout);
            apl.setVisibility(View.GONE);

            jsInterface = new JSInterface(this);

            progressLayout = (RelativeLayout) findViewById(R.id.progressLayout);

            loading = (ProgressBar) findViewById(R.id.loading);

            webView = (WebView) findViewById(R.id.webView);
            webView.getSettings().setJavaScriptEnabled(true);
            webView.addJavascriptInterface(jsInterface, "Android");
            webView.setWebViewClient(new WebViewClient() {
                int k = 0;
                boolean viewCreated = false;

                @Override
                public void onReceivedError(WebView view, WebResourceRequest request, WebResourceError error) {
                    Gson gson = new Gson();

                    String scheduleJSONString = preferences.getString("schedule", null);
                    String gradeJSONString = preferences.getString("grade", null);
                    String examJSONString = preferences.getString("exam",null);

                    Type typeOfScheduleList = new TypeToken<ArrayList<Schedule>>() {}.getType();
                    Type typeOfGradeList = new TypeToken<ArrayList<Grade>>() {}.getType();
                    Type typeOfExamList = new TypeToken<ArrayList<Exam>>() {}.getType();

                    scheduleArrayList = gson.fromJson(scheduleJSONString, typeOfScheduleList);
                    gradeArrayList = gson.fromJson(gradeJSONString, typeOfGradeList);
                    examArrayList = gson.fromJson(examJSONString, typeOfExamList);

                    progressLayout.setVisibility(View.GONE);
                    apl.setVisibility(View.VISIBLE);

                    createDrawerView();
                }

                @Override
                public void onPageFinished(WebView view, String url) {
                    if (k == 0) {
                        String javascript = "javascript: " +
                                "if (document.title != 'Cổng Thông Tin Sinh Viên') {" +
                                "var x = document.getElementById('username').value = '" + username + "';" +
                                "var y = document.getElementById('password').value = '" + password + "';" +
                                "var submitBtn = document.getElementsByClassName('btn-submit');" +
                                "submitBtn[0].click();" +
                                "} else {location.reload();}";
                        view.loadUrl(javascript);
                    }
                    if (k > 0 && !viewCreated) {
                        String jsGrade = "javascript: " +
                                "var token = document.getElementsByName('_token')[0].content;" +
                                "$.ajaxSetup({" +
                                "headers: {" +
                                "'X-CSRF-TOKEN': token" +
                                "}" +
                                "});" +
                                "$.ajax({" +
                                "url: 'http://www.aao.hcmut.edu.vn/stinfo/grade/ajax_grade'," +
                                "method: 'POST'," +
                                "type: 'json'," +
                                "data : {_token: token}," +
                                "success: function (data, status, xhr) {" +
                                "Android.setGradeJSONObject(JSON.stringify(data));" +
                                "}" +
                                "});";
                        view.loadUrl(jsGrade);
                        String jsSchedule = "javascript: " +
                                "var token = document.getElementsByName('_token')[0].content;" +
                                "$.ajaxSetup({" +
                                "headers: {" +
                                "'X-CSRF-TOKEN': token" +
                                "}" +
                                "});" +
                                "$.ajax({" +
                                "url: 'http://www.aao.hcmut.edu.vn/stinfo/lichthi/ajax_lichhoc'," +
                                "method: 'POST'," +
                                "type: 'json'," +
                                "data : {_token: token}," +
                                "success: function (data, status, xhr) {" +
                                "Android.setScheduleJSONObject(JSON.stringify(data));" +
                                "}" +
                                "});";
                        view.loadUrl(jsSchedule);
                        String jsExam = "javascript: " +
                                "var token = document.getElementsByName('_token')[0].content;" +
                                "$.ajaxSetup({" +
                                "headers: {" +
                                "'X-CSRF-TOKEN': token" +
                                "}" +
                                "});" +
                                "$.ajax({" +
                                "url: 'http://www.aao.hcmut.edu.vn/stinfo/lichthi/ajax_lichthi'," +
                                "method: 'POST'," +
                                "type: 'json'," +
                                "data : {_token: token}," +
                                "success: function (data, status, xhr) {" +
                                "Android.setExamJSONObject(JSON.stringify(data));" +
                                "}" +
                                "});";
                        view.loadUrl(jsExam);
                        String javascript = "javascript: location.reload();";
                        view.loadUrl(javascript);
                    }

                    JSONObject gradeListJSON = jsInterface.getGradeJSONObject();
                    JSONObject scheduleListJSON = jsInterface.getScheduleJSONObject();
                    JSONObject examListJSON = jsInterface.getExamJSONObject();

                    if (gradeListJSON != null && gradeArrayList == null) {
                        JSONArray semesterList = gradeListJSON.names();
                        gradeArrayList = new ArrayList<Grade>();
                        for (int i = 0; i < semesterList.length(); i++) {
                            try {
                                JSONObject gradeJSON = gradeListJSON.getJSONObject(semesterList.get(i).toString());
                                if (!(gradeJSON.get("diem") instanceof JSONArray)) {
                                    JSONArray index = gradeJSON.getJSONObject("diem").names();
                                    JSONArray jsonArray = new JSONArray();
                                    for (int j = 0; j < index.length(); j++) {
                                        JSONObject gradeDetailJSON = gradeJSON.getJSONObject("diem").getJSONObject(index.getString(j));
                                        jsonArray.put(gradeDetailJSON);
                                    }
                                    gradeJSON.put("diem", jsonArray);
                                }
                                Gson gson = new Gson();
                                Grade grade = gson.fromJson(gradeJSON.toString(), Grade.class);
                                gradeArrayList.add(grade);
                            } catch (JSONException e) {
                                e.printStackTrace();
                            }
                        }
                        Gson gson = new Gson();
                        String json = gson.toJson(gradeArrayList);
                        editor.putString("grade", json);
                        editor.apply();
                    }

                    if (scheduleListJSON != null && scheduleArrayList == null) {
                        JSONArray semesterList = scheduleListJSON.names();
                        scheduleArrayList = new ArrayList<Schedule>();
                        for (int i = 0; i < semesterList.length(); i++) {
                            try {
                                JSONObject scheduleJSON = scheduleListJSON.getJSONObject(semesterList.getString(i));
                                if (!(scheduleJSON.get("lichhoc") instanceof JSONArray)) {
                                    JSONArray index = scheduleJSON.getJSONObject("lichhoc").names();
                                    JSONArray jsonArray = new JSONArray();
                                    for (int j = 0; j < index.length(); j++) {
                                        JSONObject scheduleDetailJSON = scheduleJSON.getJSONObject("lichhoc").getJSONObject(index.getString(j));
                                        jsonArray.put(scheduleDetailJSON);
                                    }
                                    scheduleJSON.put("lichhoc", jsonArray);
                                }
                                Gson gson = new Gson();
                                Schedule schedule = gson.fromJson(scheduleJSON.toString(), Schedule.class);
                                scheduleArrayList.add(schedule);
                            } catch (JSONException e) {
                                e.printStackTrace();
                            }
                        }
                        Gson gson = new Gson();
                        String json = gson.toJson(scheduleArrayList);
                        editor.putString("schedule", json);
                        editor.apply();
                    }

                    if (examListJSON != null && examArrayList == null) {
                        JSONArray semesterList = examListJSON.names();
                        examArrayList = new ArrayList<Exam>();
                        for (int i = 0; i < semesterList.length(); i++) {
                            try {
                                JSONObject examJSON = examListJSON.getJSONObject(semesterList.get(i).toString());
                                if (!(examJSON.get("lichthi") instanceof JSONArray)) {
                                    JSONArray index = examJSON.getJSONObject("lichthi").names();
                                    JSONArray jsonArray = new JSONArray();
                                    for (int j = 0; j < index.length(); j++) {
                                        JSONObject examDetailJSON = examJSON.getJSONObject("lichthi").getJSONObject(index.getString(j));
                                        jsonArray.put(examDetailJSON);
                                    }
                                    examJSON.put("lichthi", jsonArray);
                                }
                                Gson gson = new Gson();
                                Exam exam = gson.fromJson(examJSON.toString(), Exam.class);
                                examArrayList.add(exam);
                            } catch (JSONException e) {
                                e.printStackTrace();
                            }
                        }
                        Gson gson = new Gson();
                        String json = gson.toJson(examArrayList);
                        editor.putString("exam", json);
                        editor.apply();
                    }

                    if (viewCreated == false && gradeArrayList != null && scheduleArrayList != null && examArrayList != null) {
                        viewCreated = true;
                        progressLayout.setVisibility(View.GONE);
                        apl.setVisibility(View.VISIBLE);

                        createDrawerView();
                    }

                    k++;
                }
            });
            webView.loadUrl("http://www.aao.hcmut.edu.vn/stinfo");

            content_main = (LinearLayout) findViewById(R.id.content_main);
        }
    }

    public void createDrawerView() {
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        ActionBarDrawerToggle toggle = new ActionBarDrawerToggle(
                this, drawer, toolbar, R.string.navigation_drawer_open, R.string.navigation_drawer_close);
        drawer.setDrawerListener(toggle);
        toggle.syncState();

        NavigationView navigationView = (NavigationView) findViewById(R.id.nav_view);
        navigationView.setNavigationItemSelectedListener(this);

        navigationView.getMenu().getItem(0).setChecked(true);
        onNavigationItemSelected(navigationView.getMenu().getItem(0));
    }

    @Override
    public void onBackPressed() {
        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        if (drawer.isDrawerOpen(GravityCompat.START)) {
            drawer.closeDrawer(GravityCompat.START);
        } else {
            super.onBackPressed();
        }
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }

    @SuppressWarnings("StatementWithEmptyBody")
    @Override
    public boolean onNavigationItemSelected(MenuItem item) {
        // Handle navigation view item clicks here.
        int id = item.getItemId();

        if (id == R.id.nav_schedule) {
            ScheduleFragment scheduleFragment = new ScheduleFragment();
            Bundle bundle = new Bundle();
            bundle.putParcelableArrayList("list", scheduleArrayList);
            scheduleFragment.setArguments(bundle);
            getSupportFragmentManager().beginTransaction().replace(R.id.content_main, scheduleFragment).commit();
        } else if (id == R.id.nav_exam) {
            ExamFragment examFragment = new ExamFragment();
            Bundle bundle = new Bundle();
            bundle.putParcelableArrayList("list", examArrayList);
            examFragment.setArguments(bundle);
            getSupportFragmentManager().beginTransaction().replace(R.id.content_main, examFragment).commit();
        } else if (id == R.id.nav_grade) {
            GradeFragment gradeFragment = new GradeFragment();
            Bundle bundle = new Bundle();
            bundle.putParcelableArrayList("list", gradeArrayList);
            gradeFragment.setArguments(bundle);
            getSupportFragmentManager().beginTransaction().replace(R.id.content_main, gradeFragment).commit();
        } else if (id == R.id.nav_bkel) {
            getSupportFragmentManager().beginTransaction().replace(R.id.content_main, new BkelFragment()).commit();
        } else if (id == R.id.nav_logout) {
            final ProgressDialog logout = new ProgressDialog(this);
            logout.setMessage("Processing...");
            logout.setProgressStyle(ProgressDialog.STYLE_SPINNER);
            logout.show();
            webView.setWebViewClient(new WebViewClient() {
                boolean connectFailed;

                @Override
                public void onReceivedError(WebView view, WebResourceRequest request, WebResourceError error) {
                    view.stopLoading();
                    logout.dismiss();
                    connectFailed = true;
                }

                @Override
                public void onPageFinished(WebView view, String url) {
                    if (!connectFailed) {
                        editor.clear();
                        editor.commit();
                        Intent intent = new Intent(getApplicationContext(), LoginActivity.class);
                        logout.dismiss();
                        finish();
                        startActivity(intent);
                    }
                }
            });
            webView.loadUrl("http://www.aao.hcmut.edu.vn/stinfo/logout");
        }

        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        drawer.closeDrawer(GravityCompat.START);
        return true;
    }
}
