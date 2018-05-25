package com.example.baovy.ex3;

import android.content.Context;

import org.json.JSONException;
import org.json.JSONObject;

public class JSInterface {
    private Context mContext;
    private String message;
    private boolean loggedIn;
    private JSONObject jsonObject;
    private JSONObject scheduleJSONObject;
    private JSONObject gradeJSONObject;
    private JSONObject examJSONObject;

    JSInterface(Context ctx) {
        this.mContext=ctx;
    }

    public String getMessage() {
        return message;
    }

    @android.webkit.JavascriptInterface
    public void setMessage(String message) {
        this.message = message;
    }

    public boolean isLoggedIn() {
        return loggedIn;
    }

    @android.webkit.JavascriptInterface
    public void setLoggedIn(boolean loggedIn) {
        this.loggedIn = loggedIn;
    }

    public JSONObject getJsonObject() {
        return jsonObject;
    }

    @android.webkit.JavascriptInterface
    public void setJsonObject(String jsonString) throws JSONException {
        JSONObject jsonObject = new JSONObject(jsonString);
        this.jsonObject = jsonObject;
    }

    public JSONObject getScheduleJSONObject() {
        return scheduleJSONObject;
    }

    @android.webkit.JavascriptInterface
    public void setScheduleJSONObject(String jsonString) throws JSONException {
        JSONObject scheduleJSONObject = new JSONObject(jsonString);
        this.scheduleJSONObject = scheduleJSONObject;
    }

    public JSONObject getGradeJSONObject() {
        return gradeJSONObject;
    }

    @android.webkit.JavascriptInterface
    public void setGradeJSONObject(String jsonString) throws JSONException {
        JSONObject gradeJSONObject = new JSONObject(jsonString);
        this.gradeJSONObject = gradeJSONObject;
    }

    public JSONObject getExamJSONObject() {
        return examJSONObject;
    }

    @android.webkit.JavascriptInterface
    public void setExamJSONObject(String jsonString) throws JSONException {
        JSONObject examJSONObject = new JSONObject(jsonString);
        this.examJSONObject = examJSONObject;
    }
}
